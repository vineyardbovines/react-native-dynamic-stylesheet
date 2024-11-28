import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  minify: true,
  outDir: "dist",
  dts: true,
  sourcemap: true,
  clean: true,
});
