import firebase from "firebase";

export default {
    state: {
        posts: [],
        favourite: false
    },
    actions: {
        async initPosts({commit}) {
            this.state.loader = true
            const post = await firebase.database().ref('posts').once('value');
            const posts = post.val();
            const postsArray = [];
            Object.keys(posts).forEach(key => {
                const p = posts[key];
                p['id'] = key
                postsArray.push(p)
            })
            commit('loadPosts', postsArray)
            this.state.loader = false
        },
        async addPost({commit}, payload) {
            const post = await firebase.database().ref('posts').push(payload);
            commit('setPost', post)
        },

        async addToFavourite({commit}, {id, favourite}) {
            const post = await firebase.database().ref('posts').child(id).update({
                favourite
            })
            console.log(post)
            commit('setFavouritePost', id)
        },


    },
    mutations: {
        setPost(state, payload) {
            state.posts.push(payload)
        },
        loadPosts(state, payload) {
            state.posts = payload
        },
        setFavouritePost(state, payload) {
            const post = state.posts.find(item => item.id === payload);
            post.favourite = !post.favourite
        },
    },
    getters: {
        getPosts(state) {
            return state.posts
        },
        getPostsFavourite(state){
            return state.posts.filter(item => item.favourite === true)
        },
        getCategories(state){
            const categories = [];
            state.posts.forEach((item, index) => {
                if (categories !== item.category) {
                    categories.push({
                        id: index,
                        name: item.category
                    })
                }
            })
            return categories
        }
    }
}
