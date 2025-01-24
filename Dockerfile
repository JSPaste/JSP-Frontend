# Required to build "www" locally before building the image container: "task install-www build-www" or "bun run build"

# FIXME: Vite failed to build: undefined ?
#FROM docker.io/oven/bun:1-alpine AS builder-www
#WORKDIR /build/
#
#COPY . ./
#
#RUN apk add --no-cache go-task
#RUN go-task install-www build-www

FROM docker.io/library/golang:1.23-alpine AS builder-server
WORKDIR /build/

# FIXME: Uncomment when vite build is fixed
#COPY --from=builder-www /build/www/dist/ ./www/dist/
#COPY --from=builder-www /build/www/bundle.go ./www/bundle.go
#COPY --from=builder-www --exclude=./www/ /build/. ./

# TODO: Uncomment when CI updates to buildah >=v1.38.0
#COPY ./www/dist/ ./www/dist/
#COPY ./www/bundle.go ./www/bundle.go
#COPY --exclude=./www/ . ./
COPY . ./

RUN apk add --no-cache go-task
RUN go-task install-server build-server

RUN addgroup jspaste && \
    adduser -G jspaste -u 17777 -s /bin/false -D jspaste && \
    grep jspaste /etc/passwd > /tmp/.frontend.passwd

FROM scratch
WORKDIR /frontend/
USER jspaste:jspaste

COPY --from=builder-server /tmp/.frontend.passwd /etc/passwd
COPY --from=builder-server /etc/group /etc/group

COPY --chown=jspaste:jspaste --from=builder-server /build/dist/server ./
COPY --chown=jspaste:jspaste --from=builder-server /build/LICENSE ./

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="@jspaste/frontend" \
      org.opencontainers.image.description="The frontend for JSPaste" \
      org.opencontainers.image.licenses="EUPL-1.2"

EXPOSE 3000

ENV ADDRESS=0.0.0.0

ENTRYPOINT ["/frontend/server"]