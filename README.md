# Frontend

This repository contains the frontend code for [JSPaste](https://jspaste.eu).

## Supported Browsers

In case you are using an older browser than the ones listed, please do not open issues about it.

- Chromium >= 111
- Firefox >= 113
- Safari >= 16

*Last checked commit
[`50f1ee9`](https://github.com/jspaste/frontend/commit/50f1ee961a3325b85138e3b16f82befb3bf4a74b) on 7 January 2025*

## Setup

### Container

- Pull latest image and run the container:

```shell
docker pull ghcr.io/jspaste/frontend:latest
docker run --env-file=.env -d -p 127.0.0.1:3000:3000 \
  ghcr.io/jspaste/frontend:latest
```

## Validate

> [!IMPORTANT]
> All artifacts and images originate from GitHub `JSPaste/Frontend` repository, no other artifacts or
> images built and distributed outside that repository are considered secure nor trusted by the JSPaste team.

Since container version
[`2024.05.19-c3f18d0`](https://github.com/jspaste/frontend/pkgs/container/frontend/218171024?tag=2024.05.19-c3f18d0),
images are attested and can be verified using the following command:

```shell
gh attestation verify oci://ghcr.io/jspaste/frontend:latest \
  --owner JSPaste
```

You can verify the integrity and origin of an artifact and/or image using the GitHub CLI or manually
at [JSPaste Attestations](https://github.com/jspaste/frontend/attestations).

## Development

### Dependencies

To work on the project we need some tools..:

- [Bun](https://bun.sh) (latest version; runtime)
- [Go](https://go.dev) (version tracked in [`go.mod`](go.mod); runtime)
- [task](https://taskfile.dev/installation/) (latest version; scripts execution)
- [golangci-lint](https://golangci-lint.run/welcome/install/#local-installation) (latest version; linting)

And the dependencies of the Frontend itself..:

```shell
task install
```

### Scripts

The project uses `task` to manage scripts. To list all available scripts, run the following command:

```shell
task --list-all
```

In general, scripts are grouped by their use and by their granularity, meaning that a script such as `task build` will
run other scripts under its name to fulfil its function, in this case building the Frontend and compiling the server.
This may not be desired in all cases, so it is recommended that scripts be run in a more specific way..:

```shell
# Bad
task build start-server

# Good, we don't need to build the server
task build-www start-server

# ...Or, we can preview everything with Vite
task build-www start-www

# ...Or, we can use the dev server directly for HMR without building
task dev-www
```

All scripts will run from any location within the project as if you were in the main directory, no fear.

### Build

Building the Frontend is very straightforward..:

```shell
task build
```

It will prepare a standalone binary ready to be run at main directory in `dist/`.

You could also avoid constantly building the server and build only "www/" (website) or the other way around..:

```shell
# Build the website
task build-www
# Or, build the server
task build-server
```

### Maintenance

Over time, local repositories can become messy with untracked files, registered hooks, and temporary files in the .git
folder. To clean up the repository (and possibly all your uncommitted work), run the following command:

```shell
task clean-git
```

If for some reason you want to clear the entire project of dependencies and build remnants..:

```shell
task clean
```

You can also clean specific things..:

```shell
# We clean "www/" and all build remnants
task clean-www clean-dist install-www
```

## License

This project is licensed under the EUPL License. See the [`LICENSE`](LICENSE) file for more details.