export default defineNuxtConfig({
  app: {
    head: {
      title: "Fotobox",
      meta: [
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover' },
      ]
    }
  },
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    /* your pwa options */
  },
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      backend: "",
      backendWs: "",
      backendHttp: "",
    }
  }
})