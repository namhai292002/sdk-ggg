
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/embed.js",
    format: "iife",
    name: "YourSDK"
  },
  plugins: [typescript(), resolve(), commonjs(), terser()],
};
