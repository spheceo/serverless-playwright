import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["production", "development"]).default("development"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})