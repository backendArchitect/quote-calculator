import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: [
    "~/assets/main.css", // Global CSS file
  ],
  components: true, // Automatically import components
  typescript: {
    strict: true,
  },
  alias: {
    "~/": "./",
  },
});
