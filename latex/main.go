package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"time"

	"cloud.google.com/go/storage"
	"github.com/Arithynet/latex/pkg/fbStorage"
	"github.com/Arithynet/latex/pkg/tikz"
	"github.com/rs/cors"
)

type Handler struct{
    bucket *storage.BucketHandle
    storageBucketUrl string
}

func NewHandler(backet *storage.BucketHandle, storageBucketUrl string) *Handler{
	return &Handler{
        bucket: backet,
        storageBucketUrl: storageBucketUrl,
    }
}

type Data struct {
	Location string `json:"location"`
}

func NewData(location string) *Data {
	return &Data{Location: location}
}

type StatusResponse struct {
	Status        string `json:"status"`
	InternalError error  `json:"internalerror,omitempty"`
}

func getHashFilename(svg string) string {
    b := sha256.Sum256([]byte(svg))
    return hex.EncodeToString(b[:]) + ".svg"
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	switch r.Method {
	case http.MethodPost:
		body, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			if err := json.NewEncoder(w).Encode(StatusResponse{Status: "err", InternalError: err}); err != nil {
				log.Println(err)
			}
			return
		}

		code := tikz.NewTikz(string(body)).MakeDir()
		defer code.RmoveDir()
		svg, err := code.Compile().Pdf2svg().SvgString()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			if err := json.NewEncoder(w).Encode(&StatusResponse{Status: "err", InternalError: err}); err != nil {
				log.Println(err)
			}
			return
		}

        filename := getHashFilename(svg)
        err = fbstorage.SvgSave(h.bucket, filename, svg)
        if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			if err := json.NewEncoder(w).Encode(&StatusResponse{Status: "err", InternalError: err}); err != nil {
				log.Println(err)
			}
			return
        }

		w.WriteHeader(http.StatusOK)
        if err := json.NewEncoder(w).Encode(NewData("gs://" + h.storageBucketUrl + "/" + filename)); err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			if err := json.NewEncoder(w).Encode(StatusResponse{Status: "err", InternalError: err}); err != nil {
				log.Println(err)
			}
			return
		}
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		if err := json.NewEncoder(w).Encode(StatusResponse{Status: "permits only POST"}); err != nil {
			log.Println(err)
		}
	}
}

func main() {
    storageBucketUrl := "test-sns-eb77d.appspot.com"
    credentialsFilepath := "./pkg/fbStorage/test-sns-key.json"
    bucket, err := fbstorage.InitFb(storageBucketUrl, credentialsFilepath)
    if err != nil {
        log.Fatalln(err)
    }

	mux := http.NewServeMux()
	mux.Handle("/", NewHandler(bucket, storageBucketUrl))

    handler := cors.Default().Handler(mux)
	srv := &http.Server{
		Addr:              ":8080",
		Handler:           handler,
		ReadHeaderTimeout: 3 * time.Second,
		ReadTimeout:       5 * time.Second,
		WriteTimeout:      5 * time.Second,
	}
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
