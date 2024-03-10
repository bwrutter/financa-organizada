import vue from "@vitejs/plugin-vue";
import { quasar } from "@quasar/vite-plugin";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({}), quasar({})],
});
