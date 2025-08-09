import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: { "simple-import-sort": simpleImportSort },
    extends: [],
    languageOptions: { globals: globals.browser },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      "vue/order-in-components": [
        "error",
        {
          order: [
            "el",
            "name",
            "components",
            "directives",
            "props",
            "emits",
            "setup",
            "data",
            "computed",
            "methods",
            "watch",
            "LIFECYCLE_HOOKS",
            "template",
            "render",
            "renderError",
          ],
        },
      ],
    },
  },
]);
