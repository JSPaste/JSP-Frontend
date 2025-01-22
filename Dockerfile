# Required to build "www" locally before building the image container: "task install-www build-www" or "bun run build"

# FIXME: Vite failed to build: undefined ?
#FROM docker.io/oven/bun:1-alpine AS builder-www
#WORKDIR /build/
#
#COPY . ./
#
#RUN apk add --no-cache go-task
#RUN go-task install-www build-www

FROM docker.io/library/alpine:3.21 AS builder-server
WORKDIR /build/

#COPY --from=builder-www /build/www/dist/ ./www/dist/
#COPY --from=builder-www /build/www/bundle.go ./www/bundle.go
#COPY --from=builder-www --exclude=./www/ /build/. ./
COPY ./www/dist/ ./www/dist/
COPY ./www/bundle.go ./www/bundle.go
COPY --exclude=./www/ . ./

RUN apk add --no-cache go go-task
RUN go-task install-server build-server

FROM docker.io/library/alpine:3.21
WORKDIR /frontend/

RUN adduser -D -h /frontend jspaste && \
    chown jspaste:jspaste /frontend/

COPY --chown=jspaste:jspaste --from=builder-server /build/dist/server ./
COPY --chown=jspaste:jspaste --from=builder-server /build/LICENSE ./

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="@jspaste/frontend" \
      org.opencontainers.image.description="The frontend for JSPaste" \
      org.opencontainers.image.licenses="EUPL-1.2"

USER jspaste

EXPOSE 3000

ENTRYPOINT ["./server"]