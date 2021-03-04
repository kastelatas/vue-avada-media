<template>
 <div class="login-page">
   <Header/>
   <template v-if="!accountExists">
     <div class="row jc-center">
       <LoginForm/>
     </div>
     <div class="row jc-center">
       <div class="account-exists">
         <p>I have no account, <span @click="accountExists = true">REGISTER NOW</span></p>
       </div>
     </div>
   </template>
   <template v-else>
     <div class="row jc-center">
       <RegisterFrom/>
     </div>
     <div class="row jc-center">
       <div class="account-exists">
         <p>I already have account, <span @click="accountExists = false">LOG IN</span></p>
       </div>
     </div>
   </template>
 </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import RegisterFrom from "@/components/RegisterFrom";
import Header from "@/components/Header";
export default {
  name:'login',
  components:{LoginForm, Header,RegisterFrom},
  data(){
    return{
      accountExists: false
    }
  }
}
</script>