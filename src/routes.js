export default [
    {
        path: '/registrarse/',
        component: require('./pages/registrarse.vue')
    },
    {
        path: '/inicio/',
        component: 'inicio-page'
    },
    {
        path: '/productos/:id/:nombre/:empresa',
        component: 'productos-page'
    },
]