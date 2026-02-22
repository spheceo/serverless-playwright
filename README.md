# serverless-playwright
Run Playwright in a serverless-friendly Nitro + Elysia app, using local Chromium in development and `@sparticuz/chromium` in production.

## How it works
1. Nitro boots your custom Elysia server entry.
2. The `/test` route launches a browser, opens a page, and returns the page title.
3. `launchBrowser()` chooses the browser runtime by environment:
   - `production`: Lambda-compatible Chromium (`@sparticuz/chromium`)
   - `development`: local `playwright` Chromium

## Runtime flow
### 1) Nitro entry wiring
```ts
// nitro.config.ts
import { defineNitroConfig } from "nitro/config"

export default defineNitroConfig({
  builder: "rollup",
  serverEntry: "./src/index.ts",
});
```

### 2) Route that runs Playwright
```ts
// src/index.ts
import { Elysia } from "elysia";
import { launchBrowser } from "../lib/browser.js";

const app = new Elysia();

app.get("/test", async () => {
  const browser = await launchBrowser();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://example.com");
  const pageTitle = await page.title();
  await browser.close();

  return { pageTitle };
});
```

### 3) Browser selection (dev vs prod)
```ts
// lib/browser.ts
import { chromium, type Browser } from "playwright-core";
import chromiumLambda from "@sparticuz/chromium";
import { env } from "./env.js";

const isProd = env.NODE_ENV === "production";

export async function launchBrowser() {
  let browser: Browser;

  if (isProd) {
    browser = await chromium.launch({
      args: [...chromiumLambda.args],
      executablePath: await chromiumLambda.executablePath(),
    });
  } else {
    const { chromium } = await import("playwright");
    browser = await chromium.launch({ headless: false });
  }

  return browser;
}
```

## Commands
```bash
pnpm dev
pnpm build
pnpm lint
```
