
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/embed.js",
    format: "iife",
    name: "YourSDK"
  },
  plugins: [resolve(), commonjs(), terser()],
};
