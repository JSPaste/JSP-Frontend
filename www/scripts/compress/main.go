package main

import (
	"compress/gzip"
	"github.com/andybalholm/brotli"
	"io"
	"log"
	"os"
	"path/filepath"
	"regexp"
)

var compressors = []struct {
	extension string
	writer    func(io.Writer) (io.WriteCloser, error)
}{
	{
		".fasthttp.gz",
		func(writer io.Writer) (io.WriteCloser, error) {
			return gzip.NewWriterLevel(writer, gzip.BestCompression)
		},
	},
	{
		".fasthttp.br",
		func(writer io.Writer) (io.WriteCloser, error) {
			return brotli.NewWriterLevel(writer, brotli.BestCompression), nil
		},
	},
}

func main() {
	err := filepath.Walk("www/dist", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && regexp.MustCompile(`\.(css|html|js|json|svg|xml)$`).MatchString(info.Name()) {
			for _, compressor := range compressors {
				if err := compress(path, compressor.extension, compressor.writer); err != nil {
					return err
				}
			}

			log.Print("Compressed: ", path)
		}

		return nil
	})
	if err != nil {
		log.Fatal(err)
	}
}

func compress(path, extension string, compressor func(io.Writer) (io.WriteCloser, error)) error {
	inFile, err := os.Open(path)
	if err != nil {
		return err
	}
	defer inFile.Close()

	outFile, err := os.Create(path + extension)
	if err != nil {
		return err
	}
	defer outFile.Close()

	writer, err := compressor(outFile)
	if err != nil {
		return err
	}
	defer writer.Close()

	_, err = io.Copy(writer, inFile)
	return err
}
