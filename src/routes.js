export default [
    {
        path: '/about/',
        component: require('./pages/about.vue')
    },
    {
        path: '/form/',
        component: require('./pages/form.vue')
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: require('./pages/dynamic-route.vue')
    },
    {
        path: '/home/',
        component: require('./pages/home.vue')
    },
    {
        path: '/registrarse/',
        component: require('./pages/registrarse.vue')
    },
]