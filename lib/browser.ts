import { chromium, type Browser } from "playwright-core";
import chromiumLambda from "@sparticuz/chromium";
import { env } from "./env.js";

const isProd = env.NODE_ENV === "production";

export async function launchBrowser() {
  let browser: Browser;
  
  // Use Lambda Chromium in prod, local Chromium otherwise.
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