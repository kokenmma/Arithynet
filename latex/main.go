package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"time"

    "github.com/rs/cors"
	"github.com/Arithynet/latex/pkg/tikz"
)

type Data struct {
	Code string `json:"code"`
}

func NewData(txt string) *Data {
	return &Data{Code: txt}
}

type StatusResponse struct {
	Status        string `json:"status"`
	InternalError error  `json:"internalerror,omitempty"`
}

func (s *Data) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

		code := tikz.NewTikz(string(body))
		svg, err := code.MakeDir().Compile().Pdf2svg().SvgString()
		defer code.RmoveDir()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			if err := json.NewEncoder(w).Encode(&StatusResponse{Status: "err", InternalError: err}); err != nil {
				log.Println(err)
			}
			return
		}

		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(NewData(svg)); err != nil {
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
	mux := http.NewServeMux()
	mux.Handle("/", NewData(""))

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
