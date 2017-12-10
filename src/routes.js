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
    {
        path: '/carrito-item/:id/:nombre/:empresa/:precio/:cantidad',
        component: 'carrito-item-page'
    },
    {
        path: '/carrito/',
        component: 'carrito-page'
    },
    {
        path: '/login/',
        component: 'login-page'
    },
    {
        path: '/app/',
        component: require('./app.vue')
    },
]