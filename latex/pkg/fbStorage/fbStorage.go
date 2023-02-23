package fbstorage

import (
	"bytes"
	"context"
	"fmt"
	"io"

	firebase "firebase.google.com/go"

	"cloud.google.com/go/storage"
	"google.golang.org/api/option"
)

func InitFb(stgBucket, crdFile string) (*storage.BucketHandle, error) {
    config := &firebase.Config{
        StorageBucket: stgBucket,//"test-sns-eb77d.appspot.com",
    }
    opt := option.WithCredentialsFile(crdFile)//("test-sns-key.json")
    app, err := firebase.NewApp(context.Background(), config, opt)
    if err != nil {
        return nil, fmt.Errorf("error initializing app: %v", err)
    }

    client, err := app.Storage(context.Background())
    if err != nil {
        return nil, fmt.Errorf("error get client: %v", err)
    }

    bucket, err := client.DefaultBucket()
    if err != nil {
        return nil, fmt.Errorf("error get bucket: %v", err)
    }
    return bucket, err
}

func SvgSave(bucket *storage.BucketHandle, filename, svg string) error {
    writer := bucket.Object(filename).NewWriter(context.Background())
    //writer.ObjectAttrs.ContentType = "text/plain"
    //writer.ObjectAttrs.CacheControl = "no-cache"
    writer.ObjectAttrs.ACL = []storage.ACLRule{
        {
            Entity: storage.AllUsers,
            Role:   storage.RoleReader,
        },
    }

    buf := bytes.NewBuffer([]byte(svg))

    if _, err := io.Copy(writer, buf); err != nil {
        return fmt.Errorf("error save svg: %v", err)
    }
    if err := writer.Close(); err != nil {
        return fmt.Errorf("error writer close: %v", err)
    }

    return nil
}
