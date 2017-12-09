import Vue from 'vue'
import Framework7 from 'framework7';
import Framework7Vue from 'framework7-vue';
import 'framework7/dist/css/framework7.material.min.css';
import 'framework7/dist/css/framework7.material.colors.min.css';
import './assets/semantic.min.css';
import './assets/jquery';
import './assets/semantic.min';
import Routes from './routes.js';
import App from './app';
import {store} from './store';
import VueCookie from 'vue-cookie';
import Inicio from './pages/inicio';
import Producto from './pages/producto';
import Vuebar from 'vuebar';

Vue.use(Vuebar);
Vue.component('inicio-page', Inicio);
Vue.component('productos-page', Producto);
Vue.use(VueCookie);
Vue.use(Framework7Vue);
new Vue({
    el: '#app',
    template: '<app/>',
    store,
    framework7: {
        root: '#app',
        material: true,
        routes: Routes,
    },
    components: {
        app: App
    }
});
