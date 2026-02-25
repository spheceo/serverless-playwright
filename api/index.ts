import { Elysia } from "elysia";
import { file } from 'bun'
import { launchBrowser } from "../lib/browser";

const app = new Elysia()

app.get('/favicon.ico', () => file('./public/favicon.ico'))

app.get("/", () => "Welcome to {{ project_name }}!")

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