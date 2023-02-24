FROM golang:1.20-alpine3.17 as builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . ./
RUN go build -o app ./

FROM alpine:3.17 as runner
WORKDIR /app
COPY --from=builder /app/Tectonic.toml ./
COPY --from=builder /app/src/* ./src/
COPY --from=builder /app/pkg/fbStorage/test-sns-key.json ./pkg/fbStorage/test-sns-key.json
RUN apk update
RUN apk add poppler-utils tectonic
RUN tectonic -X build
COPY --from=builder /app/app /app/app
CMD ["/app/app"]
