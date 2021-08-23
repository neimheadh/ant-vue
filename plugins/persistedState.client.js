import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    console.log('Store', store);
    createPersistedState()(store);
}