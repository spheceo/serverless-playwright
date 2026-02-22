import { defineNitroConfig } from "nitro/config"

export default defineNitroConfig({
  builder: "rollup",
  serverEntry: './src/index.ts',
});
