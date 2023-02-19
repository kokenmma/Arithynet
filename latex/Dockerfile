FROM golang:1.20-bullseye
WORKDIR /opt/app
COPY go.mod ./
RUN go mod download
COPY . ./
RUN go build -o app ./
RUN apt update
RUN apt -y install poppler-utils
RUN curl -L -o tectonic https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic%400.12.0/tectonic-0.12.0-x86_64.AppImage
RUN chmod 755 tectonic
RUN ./tectonic --appimage-extract-and-run -X build
CMD ["/opt/app/app"]
