package fbstorage

import (
	"context"
	"fmt"
	"io"
	"log"

	firebase "firebase.google.com/go"

	"cloud.google.com/go/storage"
	"google.golang.org/api/option"
)

func initFb() (*firebase.App, error) {
    config := &firebase.Config{
        StorageBucket: "test-sns-eb77d.appspot.com",
    }
    opt := option.WithCredentialsFile("test-sns-key.json")
    app, err := firebase.NewApp(context.Background(), config, opt)
    if err != nil {
      return nil, fmt.Errorf("error initializing app: %v", err)
    }
    return app, err
}

func svgSave(filename string, svg io.Reader) {
    app, err := initFb()
    if err != nil {
        log.Println()
        return
    }

    client, err := app.Storage(context.Background())
    if err != nil {
        log.Println(err)
    }

    bucket, err := client.DefaultBucket()
    if err != nil {
        log.Println(err)
    }

    ctx := context.Background()

    writer := bucket.Object(filename).NewWriter(ctx)
    writer.ObjectAttrs.ContentType = "text/plain"
    writer.ObjectAttrs.CacheControl = "no-cache"
    writer.ObjectAttrs.ACL = []storage.ACLRule{
        {
            Entity: storage.AllUsers,
            Role:   storage.RoleReader,
        },
    }

    if _, err = io.Copy(writer, svg); err != nil {
        log.Fatalln(err)
    }
    defer func() {
        if err := writer.Close(); err != nil {
            log.Println(err)
        }
    }()
}
