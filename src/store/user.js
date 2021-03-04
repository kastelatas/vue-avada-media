import firebase from "firebase";

export default {
    state: {
        user: null,
        loader: false
    },
    actions: {
        async registerUser({commit}, {email, password}) {
            console.log(this.state)
            this.state.loader = true;
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            this.state.loader = false;
            commit('setUser', user)
        },
        async loginUser({commit}, {email, password}) {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(user)
            commit('setUser', user)
        },
        async signOut({commit}) {
            const user = await firebase.auth().signOut();
            console.log(user)
            commit('setUser', user)
        },
        loggeduser({commit}, payload) {
            console.log(payload)
            if (payload) {
                console.log(payload.uid)
                commit('setUser', payload.uid)
            } else if (payload == null) {
                commit('setUser', payload)
            }

        }
    },
    mutations: {
        setUser(state, user) {
            if (user == null) {
                state.user = null
            }
            state.user = user;
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        checkUser(state) {
            return state.user !== null
        }
    }
}