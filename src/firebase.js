import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import {store} from "@/store";

const firebaseConfig = {
    apiKey: "AIzaSyDf_bIZq2p_GR4THfGDwjsi7iM62QAiSlI",
    authDomain: "vue-avada-media.firebaseapp.com",
    projectId: "vue-avada-media",
    storageBucket: "vue-avada-media.appspot.com",
    messagingSenderId: "377533341811",
    appId: "1:377533341811:web:e59265450f6760a8224a06"
}
firebase.initializeApp(firebaseConfig)
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch('loggeduser', user)
    } else {
        store.dispatch('loggeduser', null)
    }

})

const db = firebase.firestore()
const auth = firebase.auth()


// export utils/refs
export {
    db,
    auth,
}