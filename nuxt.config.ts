// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        // TODO move this to page setup useHead()
        head: {
            script: [
                { src: '/script/jquery.min.js' },
                { src: '/script/bootstrap.bundle.min.js' },
                { src: '/script/adminlte.min.js' },
            ],
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback'},
                { rel: 'stylesheet', href: '/css/fontawesome-all.min.css'},
                { rel: 'stylesheet', href: '/css/icheck-bootstrap.min.css'},
                { rel: 'stylesheet', href: '/css/adminlte.min.css'}
            ],
            bodyAttrs: {
                class: 'login-page'
            }
        }
    }
})
