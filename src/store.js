import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        baseUrl: 'http://localhost/blackMarket/api/web/v1/',
        autenticado: false,
        username: '',
    },
    mutations: {
        setAutenticado(state, autenticado) {
            state.autenticado = autenticado;
        },
        setUsername(state, username) {
            state.username = username;
        },
    }
});