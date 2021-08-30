import fr from './translations/messages.fr';

export default {
    buildModules: [
        '@nuxt/typescript-build',
    ],

    components: {
        dirs: [
            '~/components/atoms',
            '~/components/molecules',
            '~/components/organisms',
        ],
    },

    modules: [
        ['@nuxtjs/i18n', {
            locales: ['en', 'fr'],
            defaultLocale: 'en',
            vueI18n: { 
                fallbackLocale: 'en',
                messages: {
                    en: require('./translations/messages.en'),
                    fr: require('./translations/messages.fr'),
                }
            },
        }],
    ],

    plugins: [
        { src: '~/plugins/database.ts' },
    ],

    store: true,
}