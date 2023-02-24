package main

import (
	"log"
	"net/http"
	"time"

	"github.com/Arithynet/latex/pkg/envConfig"
	"github.com/Arithynet/latex/pkg/fbStorage"
	"github.com/Arithynet/latex/pkg/handler"
	"github.com/rs/cors"
)

func main() {
	env, err := envConfig.Parse()
	if err != nil {
		log.Fatal(err)
	}
	fbStr, err := fbstorage.NewfbStorage(env.StorageBucketUrl).InitFbStorage(env.CredentialsFilepath)
	if err != nil {
		log.Fatalln(err)
	}

	mux := http.NewServeMux()
	mux.Handle("/", handler.NewHandler(fbStr))

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
