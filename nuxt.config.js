export default {
    buildModules: [
        '@nuxt/typescript-build',
        ['@nuxtjs/fontawesome', {
            icons: {
                solid: true,
            }
        }],
    ],

    components: {
        dirs: [
            '~/components/atoms',
            '~/components/molecules',
            '~/components/organisms',
        ],
    },

    css: [
        '~/assets/scss/main.scss',
    ],

    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ]
    },

    modules: [
        ['@nuxtjs/i18n', {
            langDir: '~/translations',
            locales: [
                { code: 'en', iso: 'en-US', file: 'en.js' },
                { code: 'fr', iso: 'fr-FR', file: 'fr.js' },
            ],
            defaultLocale: 'en',
            detectBrowserLanguage: {
                useCookie: true,
                cookie: 'ant_i18n',
            },
            strategy: 'no_prefix',
            vueI18n: { 
                fallbackLocale: 'en',
            },
        }],
    ],

    plugins: [
        { src: '~/plugins/database.ts' },
        { src: '~/plugins/events.ts' },
    ],

    store: true,
}