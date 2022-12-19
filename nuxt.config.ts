// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['nuxt-lodash'],
    runtimeConfig: {
        backendUrl: 'http://localhost',
        public: {},
    }
})
