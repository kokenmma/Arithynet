package fbstorage

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/url"

	firebase "firebase.google.com/go"

	"cloud.google.com/go/storage"
	"google.golang.org/api/option"
)

type FbStorage struct {
	StorageBucket string
	BucketHandle  *storage.BucketHandle
}

func NewfbStorage(stgBucket string) *FbStorage {
	return &FbStorage{
		StorageBucket: stgBucket,
	}
}

func (f *FbStorage) InitFbStorage(creFile string) (*FbStorage, error) {
	config := &firebase.Config{
		StorageBucket: f.StorageBucket,
	}
	opt := option.WithCredentialsFile(creFile)
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
	f.BucketHandle = bucket
	return f, err
}

func (f *FbStorage) SaveImg(filename string, img []byte) (string, error) {
	writer := f.BucketHandle.Object(filename).NewWriter(context.Background())
	//writer.ObjectAttrs.ContentType = "text/plain"
	//writer.ObjectAttrs.CacheControl = "no-cache"
	writer.ObjectAttrs.ACL = []storage.ACLRule{
		{
			Entity: storage.AllUsers,
			Role:   storage.RoleReader,
		},
	}

	buf := bytes.NewBuffer(img)

	if _, err := io.Copy(writer, buf); err != nil {
		return "", fmt.Errorf("error save img: %v", err)
	}
	if err := writer.Close(); err != nil {
		return "", fmt.Errorf("error writer close: %v", err)
	}

	url := &url.URL{
		Scheme: "http",
		Host:   "storage.googleapis.com",
		Path:   f.StorageBucket,
	}
	url = url.JoinPath(filename)
	return url.String(), nil
}
