FROM golang:1.20-alpine3.17
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . ./
RUN go build -o app ./
RUN apk update
RUN apk add poppler-utils tectonic
RUN tectonic -X build
CMD ["/app/app"]
