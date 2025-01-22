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

	logLevelEnv := getEnv("LOGLEVEL", uint8(2)).(uint8)
	// fatal & panic logging should always be enabled
	if logLevelEnv > 4 {
		logLevelEnv = 4
	}
	log.SetLevel(log.Level(logLevelEnv))

	addressEnv := getEnv("ADDRESS", "127.0.0.1").(string)
	portEnv := getEnv("PORT", uint16(3000)).(uint16)

	server := fiber.New(fiber.Config{
		StrictRouting: true,
		ColorScheme: fiber.Colors{
			Black:   "\x1b[90m",
			Red:     "\x1b[38;2;239;84;84m",
			Green:   "\x1b[38;2;112;239;84m",
			Yellow:  "\x1b[38;2;239;213;84m",
			Blue:    "\x1b[38;2;89;84;239m",
			Magenta: "\x1b[38;2;239;84;213m",
			Cyan:    "\x1b[38;2;84;239;239m",
			White:   "\x1b[97m",
			Reset:   "\x1b[0m",
		},
		RequestMethods: []string{fiber.MethodGet},
	})

	server.Get("/*", static.New("", static.Config{
		FS: www.Bundle(),
		NotFoundHandler: func(ctx fiber.Ctx) error {
			return ctx.SendFile("index.html", fiber.SendFile{
				FS: www.Bundle(),
			})
		},
	}))

	log.Info("Listening on ", addressEnv, ":", portEnv)

	err := server.Listen(fmt.Sprint(addressEnv, ":", portEnv), fiber.ListenConfig{
		DisableStartupMessage: true,
		EnablePrefork:         false,
		EnablePrintRoutes:     false,
	})

	if err != nil {
		log.Fatal("Can't start Frontend server:", err)
	}
}

func getEnv(key string, defaultValue interface{}) interface{} {
	if value, exists := os.LookupEnv(key); exists {
		switch defaultValue.(type) {
		case int8:
			{
				if intValue, err := strconv.ParseInt(value, 10, 8); err == nil {
					return int8(intValue)
				}
			}
		case int16:
			{
				if intValue, err := strconv.ParseInt(value, 10, 16); err == nil {
					return int16(intValue)
				}
			}
		case int32:
			{
				if intValue, err := strconv.ParseInt(value, 10, 32); err == nil {
					return int32(intValue)
				}
			}
		case int64:
			{
				if intValue, err := strconv.ParseInt(value, 10, 64); err == nil {
					return int(intValue)
				}
			}
		case int:
			{
				if intValue, err := strconv.Atoi(value); err == nil {
					return intValue
				}
			}
		case uint8:
			{
				if uintValue, err := strconv.ParseUint(value, 10, 8); err == nil {
					return uint8(uintValue)
				}
			}
		case uint16:
			{
				if uintValue, err := strconv.ParseUint(value, 10, 16); err == nil {
					return uint16(uintValue)
				}
			}
		case uint32:
			{
				if uintValue, err := strconv.ParseUint(value, 10, 32); err == nil {
					return uint32(uintValue)
				}
			}
		case uint64:
			{
				if uintValue, err := strconv.ParseUint(value, 10, 64); err == nil {
					return uintValue
				}
			}
		case uint:
			{
				if uintValue, err := strconv.ParseUint(value, 10, 64); err == nil {
					return uint(uintValue)
				}
			}
		case float32:
			{
				if floatValue, err := strconv.ParseFloat(value, 32); err == nil {
					return float32(floatValue)
				}
			}
		case float64:
			{
				if floatValue, err := strconv.ParseFloat(value, 64); err == nil {
					return floatValue
				}
			}
		case bool:
			{
				if boolValue, err := strconv.ParseBool(value); err == nil {
					return boolValue
				}
			}
		case string:
			{
				return value
			}
		}

		log.Warn(fmt.Sprintf("Unexpected value for env \"%s\": got \"%s\", falling back to default...", key, value))
		return defaultValue
	}

	return defaultValue
}
