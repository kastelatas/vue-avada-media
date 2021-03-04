import Vue from 'vue'
import Router from 'vue-router'
import {store} from "@/store";

Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/create-post',
            name: 'create-post',
            component: () => import('@/views/CreatePost.vue'),
            meta: {
                layout: 'auth-layout'
            },
            beforeEnter(to, from, next) {
                if (store.getters.checkUser) {
                    next()
                } else {
                    next('/login')
                }
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue'),
            meta: {
                layout: 'auth-layout'
            }
        }
    ]
})