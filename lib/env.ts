import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    // PROXY_URL: z.url(),
    NODE_ENV: z.enum(["production", "development"]).default("development"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
