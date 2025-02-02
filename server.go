package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/jspaste/frontend/www"
	"github.com/valyala/fasthttp"
	"io"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	_ = godotenv.Load()

	bindAddressEnv := getEnv("JSP_BIND_ADDRESS", "localhost").(string)
	portEnv := getEnv("JSP_PORT", uint16(3000)).(uint16)

	fs := &fasthttp.FS{
		FS:              www.Bundle(),
		Compress:        true,
		CompressBrotli:  true,
		AcceptByteRange: true,
	}

	requestHandler := fs.NewRequestHandler()

	handler := func(ctx *fasthttp.RequestCtx) {
		path := string(ctx.Path())

		if path == "/" {
			ctx.Request.SetRequestURI("/index.html")
		}

		requestHandler(ctx)

		if ctx.Response.StatusCode() == fasthttp.StatusNotFound {
			ctx.Request.SetRequestURI("/index.html")
			ctx.Response.Header.Set("Content-Type", "text/html; charset=utf-8")
			requestHandler(ctx)
		}

		path = string(ctx.Path())

		if strings.HasPrefix(path, "/assets/") {
			ctx.Response.Header.Set("Cache-Control", "max-age=31536000, public, immutable")
		} else if strings.HasSuffix(path, ".html") {
			ctx.Response.Header.Set("Cache-Control", "max-age=0, no-store")
		} else {
			ctx.Response.Header.Set("Cache-Control", "max-age=600, public, no-transform")
		}

		if len(ctx.Response.Header.Peek("Content-Encoding")) > 0 {
			ctx.Response.Header.Set("Vary", "Accept-Encoding")
		}

		ctx.Response.Header.Del("Last-Modified")
	}

	server := &fasthttp.Server{
		Logger:                log.New(io.Discard, "", 0),
		Handler:               handler,
		GetOnly:               true,
		NoDefaultServerHeader: true,
	}

	fmt.Print("Listening on http://", bindAddressEnv, ":", portEnv, "\n")

	log.Fatal(server.ListenAndServe(fmt.Sprint(bindAddressEnv, ":", portEnv)))
}

func getEnv(key string, defaultValue interface{}) interface{} {
	if value, exists := os.LookupEnv(key); exists {
		switch defaultValue.(type) {
		case int8:
			if intValue, err := strconv.ParseInt(value, 10, 8); err == nil {
				return int8(intValue)
			}
		case int16:
			if intValue, err := strconv.ParseInt(value, 10, 16); err == nil {
				return int16(intValue)
			}
		case int32:
			if intValue, err := strconv.ParseInt(value, 10, 32); err == nil {
				return int32(intValue)
			}
		case int64:
			if intValue, err := strconv.ParseInt(value, 10, 64); err == nil {
				return int(intValue)
			}
		case int:
			if intValue, err := strconv.Atoi(value); err == nil {
				return intValue
			}
		case uint8:
			if uintValue, err := strconv.ParseUint(value, 10, 8); err == nil {
				return uint8(uintValue)
			}
		case uint16:
			if uintValue, err := strconv.ParseUint(value, 10, 16); err == nil {
				return uint16(uintValue)
			}
		case uint32:
			if uintValue, err := strconv.ParseUint(value, 10, 32); err == nil {
				return uint32(uintValue)
			}
		case uint64:
			if uintValue, err := strconv.ParseUint(value, 10, 64); err == nil {
				return uintValue
			}
		case uint:
			if uintValue, err := strconv.ParseUint(value, 10, 64); err == nil {
				return uint(uintValue)
			}
		case float32:
			if floatValue, err := strconv.ParseFloat(value, 32); err == nil {
				return float32(floatValue)
			}
		case float64:
			if floatValue, err := strconv.ParseFloat(value, 64); err == nil {
				return floatValue
			}
		case bool:
			if boolValue, err := strconv.ParseBool(value); err == nil {
				return boolValue
			}
		case string:
			return value
		}

		log.Printf("Unexpected value for env \"%s\": got \"%s\", falling back to default...", key, value)
		return defaultValue
	}

	return defaultValue
}
