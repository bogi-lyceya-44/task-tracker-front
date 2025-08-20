import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [vue(), vueJsx(), svgLoader({ svgo: false })],
  base: process.env.NODE_ENV === "production" ? "/task-tracker-front/" : "/",
});
