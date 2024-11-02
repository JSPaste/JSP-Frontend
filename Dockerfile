# Required to build the server locally before building the image container: "bun run build:server"
FROM docker.io/oven/bun:1-distroless
WORKDIR /frontend/

COPY --chown=nonroot ./dist/ ./
COPY --chown=nonroot ./LICENSE ./

LABEL org.opencontainers.image.url="https://jspaste.eu" \
      org.opencontainers.image.source="https://github.com/jspaste/frontend" \
      org.opencontainers.image.title="@jspaste/frontend" \
      org.opencontainers.image.description="The frontend for JSPaste" \
      org.opencontainers.image.documentation="https://docs.jspaste.eu" \
      org.opencontainers.image.licenses="EUPL-1.2"

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["bun", "run", "./server/index.js"]