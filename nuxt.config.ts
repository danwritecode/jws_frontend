import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  publicRuntimeConfig: {
    BASE_URL: process.env.DEPLOY_PRIME_URL ? `${process.env.DEPLOY_PRIME_URL}`:'http://localhost:3000'
  },
  css: ["@/assets/main.css"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
    transpile: [
      '@apollo/client',
      'ts-invariant/process'
    ]
  },
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap' }
    ],
  },
})
