package main

import (
	"errors"
	min "github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
	"github.com/tdewolff/minify/v2/html"
	"github.com/tdewolff/minify/v2/js"
	"github.com/tdewolff/minify/v2/json"
	"github.com/tdewolff/minify/v2/svg"
	"github.com/tdewolff/minify/v2/xml"
	"log"
	"os"
	"path/filepath"
)

func main() {
	m := min.New()

	m.AddFunc(".css", css.Minify)
	m.AddFunc(".html", html.Minify)
	m.AddFunc(".js", js.Minify)
	m.AddFunc(".json", json.Minify)
	m.AddFunc(".svg", svg.Minify)
	m.AddFunc(".xml", xml.Minify)

	err := filepath.Walk("www/dist", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() {
			if err := minify(m, path); err != nil {
				return err
			}

			log.Print("Minified: ", path)
		}

		return nil
	})
	if err != nil {
		log.Fatal(err)
	}
}

func minify(m *min.M, path string) error {
	content, err := os.ReadFile(path)
	if err != nil {
		return err
	}

	minified, err := m.Bytes(filepath.Ext(path), content)
	if err != nil {
		if errors.Is(err, min.ErrNotExist) {
			return nil
		}
		return err
	}

	if err := os.WriteFile(path, minified, 0644); err != nil {
		return err
	}

	return nil
}
