import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  css: ["@/assets/main.css"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    }
  },
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      // { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap' }
    ],
   }
})
