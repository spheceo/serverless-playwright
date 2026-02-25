# test

This repository provides a minimal Bun API template built with the Elysia framework and intended for deployment on Vercel.

## Getting Started

First, run the development server:

```
bun run dev
```

`bun run --watch` (used by the dev script) is a live-reload mode for Bun applications. It watches your project files and automatically rebuilds/restarts the app whenever code changes, which speeds up local development and shortens the edit-run-test loop.

Open [http://localhost:8080](http://localhost:8080) with your browser or API client to see the result.

You can start editing the API by modifying `api/index.ts`. The API auto-updates as you edit the file.

## Deploy on Vercel

The recommended way to deploy this Bun + Elysia app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Vercel functions documentation](https://vercel.com/docs/functions/runtimes/bun) for more details.
