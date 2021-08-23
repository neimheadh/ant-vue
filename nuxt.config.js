export default {
    components: {
        dirs: [
            '~/components/atoms',
            '~/components/molecules',
            '~/components/organisms',
        ],
    },

    plugins: [
        { src: '~/plugins/persistedState.client.js' },
    ],

    store: true,
}