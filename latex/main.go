package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/Arithynet/latex/pkg/tikzCompile"
)

type Data struct {
	Code string `json:"code"`
}

type StatusResponse struct {
	Status        string `json:"status"`
	InternalError error  `json:"internalerror,omitempty"`
}

func NewData(txt string) *Data {
	return &Data{Code: txt}
}

func (s *Data) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	switch r.Method {
	case http.MethodPost:
		body, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
			if err := json.NewEncoder(w).Encode(StatusResponse{Status: "err", InternalError: err}); err != nil {
				log.Println(err)
			}
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		data := NewData(string(body))
		// log.Println(data.Code)
		if err := json.NewEncoder(w).Encode(NewData(tikz.TikzWrapper(data.Code))); err != nil {
			log.Println(err)
			if err := json.NewEncoder(w).Encode(StatusResponse{Status: "err", InternalError: err}); err != nil {
				log.Println(err)
			}
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK)
	default:
		if err := json.NewEncoder(w).Encode(StatusResponse{Status: "permits only POST"}); err != nil {
			log.Println(err)
		}
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func main() {
	mux := http.NewServeMux()
	mux.Handle("/", NewData(""))
	srv := &http.Server{
		Addr:              ":8080",
		Handler:           mux,
		ReadHeaderTimeout: 3 * time.Second,
		ReadTimeout:       5 * time.Second,
		WriteTimeout:      5 * time.Second,
	}
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
