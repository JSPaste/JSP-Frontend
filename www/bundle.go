package www

import (
	"embed"
	"io/fs"
	"log"
)

//go:embed dist
var dist embed.FS

func Bundle() fs.FS {
	build, err := fs.Sub(dist, "dist")

	if err != nil {
		log.Fatal(err)
	}

	return build
}
