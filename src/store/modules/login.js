export default {
    namespaced: true,
    state: {
        userData: {
            login: 'test123',
            password: '123456',
        },
        twoFactorAuth: '9988aa'
    },
    getters: {
        getUserData: state => state.userData,
        getTwoFactorAuth: state => state.twoFactorAuth,
    },
    mutations: {},
    actions: {}
}