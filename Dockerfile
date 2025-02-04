FROM docker.io/oven/bun:1-alpine AS builder-www
WORKDIR /build/

# TODO: Still on Alpine 3.20, so only golang 1.22 is available
COPY --from=docker.io/library/golang:1.23-alpine /usr/local/go/ /usr/local/go/
COPY . ./

ENV PATH="/usr/local/go/bin:${PATH}"

# Vite requires Node.js on build process
RUN apk add --no-cache go-task nodejs
RUN go-task install-www build-www

FROM docker.io/library/golang:1.23-alpine AS builder-server
WORKDIR /build/

# TODO: Uncomment when CI updates to buildah >=v1.38.0
#COPY --from=builder-www /build/www/dist/ ./www/dist/
#COPY --from=builder-www /build/www/bundle.go ./www/bundle.go
#COPY --from=builder-www --exclude=./www/ /build/. ./
COPY --from=builder-www /build/. ./

RUN apk add --no-cache go-task
RUN go-task install-server build-server

FROM docker.io/library/alpine:3.21
WORKDIR /frontend/

RUN addgroup jspaste && \
    adduser -G jspaste -u 7777 -s /bin/false -D jspaste && \
    chown jspaste:jspaste /frontend/

COPY --chown=jspaste:jspaste --from=builder-server /build/dist/server ./
COPY --chown=jspaste:jspaste --from=builder-server /build/LICENSE ./

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="@jspaste/frontend" \
      org.opencontainers.image.description="The frontend for JSPaste" \
      org.opencontainers.image.licenses="EUPL-1.2"

USER jspaste:jspaste

EXPOSE 3000

ENV JSPF_BIND_ADDRESS=[::]

ENTRYPOINT ["/frontend/server"]