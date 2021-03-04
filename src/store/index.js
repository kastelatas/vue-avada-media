import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/user";
import posts from "@/store/posts";
Vue.use(Vuex)

export const store  = new Vuex.Store({
    state: {
        layout: 'default-layout',
        loader: false
    },
    mutations: {
        setLayout(state, payload) {
            state.layout = payload
        }
    },
    actions: {},
    getters: {
        layout(state) {
            return state.layout
        }
    },
    modules:{
        user,
        posts
    }
})