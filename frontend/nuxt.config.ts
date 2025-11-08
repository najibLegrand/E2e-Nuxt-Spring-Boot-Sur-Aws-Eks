export default defineNuxtConfig({
  runtimeConfig: { public: { apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api" } },
  nitro: { preset: "node-server" }
})
