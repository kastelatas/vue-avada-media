<template>
  <div id="app">
  <component :is="layout">
    <router-view/>
  </component>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },

  computed:{
    layout(){
      return this.$route.meta.layout || 'default-layout'
    }
  }
}
</script>

<style>

</style>
