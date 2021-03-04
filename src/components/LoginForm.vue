<template>
  <div class="form">
    <form @submit.prevent="submit">
      <h3 class="title">Login</h3>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Example@gmail.com" v-model="email">
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <div class="password-block">
          <input :type="typeIn ? 'text' : 'password'" id="password" v-model="password">
          <inline-svg src="./img/show-password.svg" @click="handleTypeIn"/>
        </div>
      </div>
      <button class="button w-100">Continue</button>
      <span class="error">{{error}}</span>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeIn: false,
      email:'',
      password:'',
      error:'',
    }
  },
  methods: {
    handleTypeIn() {
      this.typeIn = !this.typeIn
    },
    submit(){
     if (this.email && this.password) {
       const user = {
         email: this.email,
         password: this.password
       }
       this.$store.dispatch('loginUser', user).then(() => {
         this.email = '';
         this.password = '';
         this.$router.push('/')

       }).catch((e) => {
         this.error = e.message
       })

     }
    }
  }
}
</script>
