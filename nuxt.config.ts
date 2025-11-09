export default defineNuxtConfig({
    srcDir: 'app',          // ← IMPORTANT
    pages: true,
    devtools: { enabled: true },
    nitro: { compatibilityDate: '2025-11-09' },
    modules: [
        '@unocss/nuxt',
        'radix-vue/nuxt',
        '@nuxt/image',
        '@pinia/nuxt',
        '@nuxtjs/i18n'
    ],
    css: [],
    typescript: { strict: true, typeCheck: false },

    routeRules: {
        '/': { swr: 60 },
        '/event/**': { swr: 300 },
        '/api/**': { cors: true }
    },

    i18n: {
        locales: [
            { code: 'fr', iso: 'fr-FR', name: 'Français' },
            { code: 'en', iso: 'en-US', name: 'English' }
        ],
        defaultLocale: 'fr',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: { cookieKey: 'i18n_redirected', alwaysRedirect: false }
    },

    image: {
        domains: ['images.unsplash.com', 'images.pexels.com', 'picsum.photos']
    }
})
