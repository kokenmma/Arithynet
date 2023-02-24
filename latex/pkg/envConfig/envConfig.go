package envConfig

import (
	"github.com/caarlos0/env/v6"
)

type EnvVar struct {
	StorageBucketUrl    string `env:"STORAGE_BUCKET_URL"`
	CredentialsFilepath string `env:"CREDENTIALS_FILEPATH"`
}

func Parse() (*EnvVar, error) {
	cfg := EnvVar{}
	if err := env.Parse(&cfg); err != nil {
		return nil, err
	}
	return &cfg, nil
}
