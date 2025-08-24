import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import wyw from '@wyw-in-js/vite';
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
    svgLoader({ svgo: false })
  ],
  base: process.env.NODE_ENV === "production" ? "/task-tracker-front/" : "/",
});
