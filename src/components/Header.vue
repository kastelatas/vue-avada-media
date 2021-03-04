<template>
  <div class="header">
    <div class="header-desctop" >
      <div class="container">
        <div class="row jc-space-between ai-center">
          <router-link to="/">
            <inline-svg src="./img/logo.svg" v-if="!isLayout"/>
            <inline-svg src="./img/logo-white.svg" v-if="isLayout"/>
          </router-link>
          <div class="header__right-block">
            <router-link :to="auth ? '/create-post' : '/login'" class="button" tag="button">
              {{ !isLayout ? 'SELL' : '+ADD' }}
            </router-link>
            <router-link to="/login" class="link" v-if="!auth">
              login
            </router-link>
            <div class="auth" v-else @click="loggout">
              LG
            </div>
            <span @click="handleFavourite" class="favourite-link">
            <inline-svg src="./img/favourite.svg" v-if="!isLayout"/>
            <inline-svg src="./img/favourite-white.svg" v-if="isLayout"/>
          </span>
          </div>
        </div>
      </div>
    </div>
    <div class="header-mobile">
      <div class="container">
        <div class="row jc-space-between ai-center">
          <router-link to="/">
            <inline-svg src="./img/logo.svg" v-if="!isLayout"/>
            <inline-svg src="./img/logo-white.svg" v-if="isLayout"/>
          </router-link>
          <div class="header-burger " :class="{
            'header-burger_active': activeBurger
          }" @click="activeBurger = !activeBurger">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>
        <div class="row jc-center transition" v-if="activeBurger">
          <div class="header__right-block">
            <router-link :to="auth ? '/create-post' : '/login'" class="button" tag="button">
              {{ !isLayout ? 'SELL' : '+ADD' }}
            </router-link>
            <router-link to="/login" class="link" v-if="!auth">
              login
            </router-link>
            <div class="auth" v-else @click="loggout">
              LG
            </div>
            <span @click="handleFavourite" class="favourite-link">
            <inline-svg src="./img/favourite.svg" v-if="!isLayout"/>
            <inline-svg src="./img/favourite-white.svg" v-if="isLayout"/>
          </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLayout: {
      type: Boolean
    }
  },
  data() {
    return {
      logged: false,
      activeBurger: false,
    }
  },
  methods: {
    loggout() {
      this.$store.dispatch('signOut')
    },
    handleFavourite(){
      this.$store.state.posts.favourite  = !  this.$store.state.posts.favourite
      this.$store.state.posts.favourite
          ?  this.$router.push({ path: '/', query: { favourite: 'true' }})
          : this.$router.push('/')

    }
  },
  computed: {
    auth() {
      if (this.$store.state.user.user) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {

  }
}
</script>
