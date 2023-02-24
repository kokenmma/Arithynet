package handler

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	fbstorage "github.com/Arithynet/latex/pkg/fbStorage"
	"github.com/Arithynet/latex/pkg/tikz"
)

type Handler struct {
	fbStorage *fbstorage.FbStorage
}

func NewHandler(fbStr *fbstorage.FbStorage) *Handler {
	return &Handler{
		fbStorage: fbStr,
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

func getHashFilename(img []byte) string {
	b := sha256.Sum256(img)
	return hex.EncodeToString(b[:])
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

		png, err := tikz.TikzWrapper(string(body))
		if err != nil {
			log.Printf("error tikz->png: %v", err)
			internaServerlError(w, err)
			return
		}

		filename := getHashFilename(png) + ".png"
		url, err := h.fbStorage.SaveImg(filename, png)
		if err != nil {
			log.Printf("error save img: %v", err)
			internaServerlError(w, err)
			return
		}

		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(SendData{Location: url})
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
