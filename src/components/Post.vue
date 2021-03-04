<template>
  <div class="post">
    <img :src="post.img ? post.img[0].path
    : 'https://opencartforum.com/storage/attachment/monthly_2020_06/no-img.png.056bf2e130881dec0f753ea5d0228c26.png'"
         alt="" class="post-img" @click="showPost"/>
    <span class="favourite" @click="addFavourite(post.id)">
      <inline-svg src="./img/favourite.svg" v-if="!post.favourite "/>
      <inline-svg src="./img/favourite-active.svg" v-if="post.favourite "/>
    </span>
    <div class="post-row">
      <p class="title">{{ post.title }}</p>
      <span class="price">${{ post.price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    addFavourite(id) {
      this.$store.dispatch('addToFavourite', {id, favourite: !this.post.favourite})
    },
    showPost() {
      this.$modal.show('post-modal', {id: this.post.id})
    }
  }
}
</script>
