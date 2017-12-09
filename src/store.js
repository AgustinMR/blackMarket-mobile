import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        baseUrl: 'http://localhost/blackMarket/api/web/v1/',
        autenticado: false,
        usuario: {
            username: '',
            email: ''
        }
    },
    mutations: {
        setAutenticado(state, autenticado) {
            state.autenticado = autenticado;
        },
        setUsername(state, username) {
            state.usuario.username = username;
        },
        setEmail(state, email) {
            state.usuario.email = email;
        }
    }
});