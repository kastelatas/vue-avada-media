<template>
  <div class="post-list">
    <Post v-for="post in posts" :key="post.id" :post="post"/>
  </div>
</template>

<script>
import Post from "@/components/Post";
export default {
  components:{Post},
  props:{
    posts:{
      type: Array
    }
  },
  data(){
    return {
    }
  },
  mounted() {

    if (!!this.$route.query.favourite === true) {
      this.$store.state.posts.favourite = true
    }
  },
  watch:{
    '$route'(){
      this.$store.state.posts.favourite = !!this.$route.query.favourite === true;
    }
  }
}
</script>
