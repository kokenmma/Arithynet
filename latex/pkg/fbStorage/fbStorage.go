import (
  "fmt"
  "context"

  firebase "firebase.google.com/go"
  "firebase.google.com/go/auth"

  "google.golang.org/api/option"
)

opt := option.WithCredentialsFile("path/to/serviceAccountKey.json")
app, err := firebase.NewApp(context.Background(), nil, opt)
if err != nil {
  return nil, fmt.Errorf("error initializing app: %v", err)
}
