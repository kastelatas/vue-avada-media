<template>
  <div class="form">
    <form @submit.prevent="submit">
      <h3 class="title">Register</h3>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Example@gmail.com" v-model="email" required>
      </div>
      <div class="input-group">
        <label for="full-name">Full name</label>
        <input type="text" id="full-name" placeholder="Tony Stark" v-model="name">
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <div class="password-block">
          <input :type="typeInPassword ? 'text' : 'password'" id="password" ref="password" v-model="password" required>
          <inline-svg src="./img/show-password.svg" @click="handleTypeIn($refs.password)"/>
        </div>
      </div>
      <div class="input-group">
        <label for="password-again">Password again</label>
        <div class="password-block">
          <input :type="typeInPasswordAgain ? 'text' : 'password'" id="password-again" ref="password_again" v-model="passwordAgain" required>
          <inline-svg src="./img/show-password.svg" @click="handleTypeIn($refs.password_again)"/>
        </div>
      </div>
      <button class="button w-100">{{!$store.state.loader ? 'Register' : '...Loading'}} </button>
      <span class="error" v-if="error">{{error}}</span>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeInPassword: false,
      typeInPasswordAgain: false,
      email:'',
      name:'',
      password:'',
      passwordAgain:'',
      error:'',
      loader:false
    }
  },
  methods: {
    //check type input
    handleTypeIn(ref)  {
      console.log(ref)
      if ( ref === this.$refs.password ) {
        this.typeInPassword = !this.typeInPassword
      }
      if ( ref === this.$refs.password_again ) {
        this.typeInPasswordAgain = !this.typeInPasswordAgain
      }
    },
    submit(){
      if (this.email && this.password && this.passwordAgain) {
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('registerUser', user).then(data => {
          console.log(data)
          this.$router.push('/')
        }).catch((e)=> {
          this.error = e.message
        }).finally(() => {
          this.$store.state.loader = false
        })
      } else {
        this.error = 'Need more data'
      }
    }
  }
}
</script>