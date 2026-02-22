import { chromium as playwrightCore } from "playwright-core";
// import type { BrowserContextOptions } from "playwright-core";
import chromium from "@sparticuz/chromium";
import { env } from "./env.js";

const isProd = env.NODE_ENV === "production";

// Chrome 131 on Windows - recent and consistent across dev/prod
export const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

async function getPlaywrightDev() {
  return isProd ? null : await import("playwright").catch(() => null);
}

export async function launchBrowser() {
  const args = ["--remote-debugging-port=9222"];
  // const proxy = { server: env.PROXY_URL };

  if (isProd) {
    return playwrightCore.launch({
      // Sparticuz Chromium is needed in serverless where full Chrome isn't available.
      args: [...chromium.args, ...args],
      executablePath: await chromium.executablePath(),
      headless: true,
      // proxy,
    });
  }

  const playwrightDev = await getPlaywrightDev();
  if (!playwrightDev) {
    throw new Error("playwright is not installed - run pnpm install");
  }

  return playwrightDev.chromium.launch({
    // Local dev runs headed so you can watch the flow and debug it.
    args,
    headless: false,
    // proxy,
  });
}

// export async function createBrowserContext(options?: {
//   storageState?: BrowserContextOptions["storageState"];
// }) {
//   const browser = await launchBrowser();
//   const context = await browser.newContext({
//     ignoreHTTPSErrors: true,
//     userAgent: USER_AGENT,
//     storageState: options?.storageState,
//     // Consistent viewport that looks normal
//     viewport: { width: 1280, height: 800 },
//     // US English locale
//     locale: "en-US",
//   });

//   return { browser, context };
// }
