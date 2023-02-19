FROM golang:1.20-bullseye
WORKDIR /opt/app
COPY go.mod ./
RUN go mod download
COPY . ./
RUN go build -o app ./
RUN apt update
RUN apt -y install texlive-lang-japanese
CMD ["/opt/app/app"]
