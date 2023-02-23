package main

import (
	"log"
	"net/http"
	"time"

	"github.com/Arithynet/latex/pkg/fbStorage"
	"github.com/Arithynet/latex/pkg/handler"
	"github.com/rs/cors"
)

func main() {
	storageBucketUrl := "test-sns-eb77d.appspot.com"
	credentialsFilepath := "./pkg/fbStorage/test-sns-key.json"
	bucket, err := fbstorage.InitFb(storageBucketUrl, credentialsFilepath)
	if err != nil {
		log.Fatalln(err)
	}

	mux := http.NewServeMux()
	mux.Handle("/", handler.NewHandler(bucket, storageBucketUrl))

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
