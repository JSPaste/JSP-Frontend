package main

import (
	"fmt"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/log"
	"github.com/gofiber/fiber/v3/middleware/static"
	"github.com/joho/godotenv"
	"github.com/jspaste/frontend/www"
	"os"
	"strconv"
)

func main() {
	_ = godotenv.Load()

	verboseEnv := getEnv("JSP_VERBOSE", false).(bool)
	if verboseEnv {
		log.SetLevel(log.LevelTrace)
	} else {
		log.SetLevel(log.LevelInfo)
	}

	bindAddressEnv := getEnv("JSP_BIND_ADDRESS", "localhost").(string)
	portEnv := getEnv("JSP_PORT", uint16(3000)).(uint16)

	server := fiber.New(fiber.Config{
		StrictRouting: true,
		GETOnly:       true,
	})

	server.Use(static.New("", static.Config{
		FS:       www.Bundle(),
		Compress: true,
	}))

	server.Get("/404", func(ctx fiber.Ctx) error {
		ctx.Status(fiber.StatusNotFound)

		return ctx.SendFile("index.html", fiber.SendFile{
			FS: www.Bundle(),
		})
	})

	server.Get("/*", func(ctx fiber.Ctx) error {
		return ctx.SendFile("index.html", fiber.SendFile{
			FS: www.Bundle(),
		})
	})

	log.Info("Listening on ", bindAddressEnv, ":", portEnv)

	log.Fatal(server.Listen(fmt.Sprint(bindAddressEnv, ":", portEnv), fiber.ListenConfig{
		DisableStartupMessage: true,
		EnablePrefork:         false,
		EnablePrintRoutes:     false,
	}))
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

		log.Warn(fmt.Sprintf("Unexpected value for env \"%s\": got \"%s\", falling back to default...", key, value))
		return defaultValue
	}

	return defaultValue
}
