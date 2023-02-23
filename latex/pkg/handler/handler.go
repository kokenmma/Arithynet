package handler

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"cloud.google.com/go/storage"
	fbstorage "github.com/Arithynet/latex/pkg/fbStorage"
	"github.com/Arithynet/latex/pkg/tikz"
)

type Handler struct {
	bucket           *storage.BucketHandle
	storageBucketUrl string
}

func NewHandler(backet *storage.BucketHandle, storageBucketUrl string) *Handler {
	return &Handler{
		bucket:           backet,
		storageBucketUrl: storageBucketUrl,
	}
}

type SendData struct {
	Location string `json:"location"`
}

type StatusResponse struct {
	Status        string `json:"status"`
	InternalError string `json:"internalerror,omitempty"`
}

func internaServerlError(w http.ResponseWriter, err error) {
	w.WriteHeader(http.StatusInternalServerError)

	err = json.NewEncoder(w).Encode(StatusResponse{Status: "err", InternalError: fmt.Sprintln(err)})
	if err != nil {
		log.Printf("error encode StatusResponse: %v", err)
	}
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
			log.Printf("error read body: %v", err)
			internaServerlError(w, err)
			return
		}

		svg, err := tikz.TikzWrapper(string(body))
		if err != nil {
			log.Printf("error tikz->svg: %v", err)
			internaServerlError(w, err)
			return
		}

		filename := getHashFilename(svg)
		err = fbstorage.SvgSave(h.bucket, filename, svg)
		if err != nil {
			log.Printf("error save svg: %v", err)
			internaServerlError(w, err)
			return
		}

		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(SendData{Location: "gs://" + h.storageBucketUrl + "/" + filename})
		if err != nil {
			log.Printf("error encode location: %v", err)
			internaServerlError(w, err)
			return
		}
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		if err := json.NewEncoder(w).Encode(StatusResponse{Status: "permits only POST"}); err != nil {
			log.Println(err)
		}
	}
}
