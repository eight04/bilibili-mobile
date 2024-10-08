import cjs from "rollup-plugin-cjs-es";
import resolve from "@rollup/plugin-node-resolve";
import { copy } from '@web/rollup-plugin-copy';
import iife from "rollup-plugin-iife";
import terser from "@rollup/plugin-terser";
import output from "rollup-plugin-write-output";
import json from "@rollup/plugin-json";

import glob from "tiny-glob";

export default {
  input: Object.fromEntries((await glob("src/*.js")).map(file => {
    const name = file.match(/([^/\\]+)\.js$/)[1];
    return [`js/${name}`, file];
  })),
  output: {
    format: "es",
    dir: "build",
    sourcemap: true,
    chunkFileNames: "js/[name]-[hash].js"
  },
  plugins: [
    resolve({
      exportConditions: [
        'node'
      ]
    }),
    json(),
    cjs({
      nested: true
    }),
    copy({
      patterns: "**/*",
      rootDir: "src/static",
    }),
    iife(),
    terser({
      module: false
    }),
    output([
      {
        test: /background\.js$/,
        target: "build/manifest.json",
        handle: (json, {scripts}) => {
          json.background.scripts = scripts;
          return json;
        }
      },
      {
        test: /content\.js$/,
        target: "build/manifest.json",
        handle: (json, {scripts}) => {
          json.content_scripts[0].js = scripts;
          return json;
        }
      },
      {
        test: /page\.js$/,
        target: "build/manifest.json",
        handle: (json, {scripts}) => {
          json.content_scripts[1].js = scripts;
          return json;
        }
      },
      // {
      //   test: /(dialog|options|picker)\.js$/,
      //   target: "build/$1.html",
      //   handle: (content, {htmlScripts}) => {
      //     return content.replace("</body>", `${htmlScripts}\n</body>`);
      //   }
      // }
    ])
  ]
};
