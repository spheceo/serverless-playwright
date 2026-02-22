import { Elysia } from "elysia";
import { launchBrowser } from "../lib/browser.js";

const app = new Elysia();

// Routes
app.get("/", () => "Welcome to serverless-playwright!");

app.get("/test", async () => {
  const browser = await launchBrowser();
  
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://example.com");
  const pageTitle = await page.title();
  await browser.close();

  return { pageTitle };
});

export default app;