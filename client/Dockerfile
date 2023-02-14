FROM node:18.12.1-alpine
WORKDIR /var/www/html
COPY package.json /var/www/html
# COPY package-lock.json /var/www/html
COPY yarn.lock /var/www/html/
# COPY .vimrc /root/
RUN yarn install
RUN apk update && apk add vim tmux