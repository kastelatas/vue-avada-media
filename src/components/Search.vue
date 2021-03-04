<template>
  <div class="search">
    <form @submit.prevent="search">
      <div class="search-input-group">
        <inline-svg src="./img/search.svg"/>
        <input type="text" class="search-input" placeholder="Search products by name" v-model="title">
      </div>
      <div class="search-input-group">
        <inline-svg src="./img/location.svg"/>
        <input type="text" class="search-location" placeholder="Location" v-model="location">
      </div>
      <button class="button">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: ''
    }
  },
  methods: {
    search() {
      this.$emit('setSearch', this.title, this.location)
    }
  }
}
</script>