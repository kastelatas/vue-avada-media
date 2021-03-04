<template>
  <modal
      name="post-modal"
      @before-open="open"
      width="600"
      height="300"
      :resizable="true"
      classes="post-modal"
      v-cloak
  >
    <div class="modal-body" v-if="post">
      <div class="slider">
        <slider ref="slider" :options="options">

          <slideritem v-for="img in post.img" :key="img.id">
            <img :src="img ? img.path : 'https://opencartforum.com/storage/attachment/monthly_2020_06/no-img.png.056bf2e130881dec0f753ea5d0228c26.png'" alt="">
          </slideritem>
          <div slot="loading">loading...</div>
        </slider>
      </div>
      <div class="content">
        <p>Title: {{ post.title }}</p>
        <p>Location: {{ post.location }}</p>
        <p>Description: {{ post.description }}</p>
        <p>price: {{ post.price }}</p>
      </div>
    </div>
    <span @click="close" class="close">x</span>
  </modal>
</template>

<script>
import {slider, slideritem} from 'vue-concise-slider'

export default {
  components: {
    slider,
    slideritem
  },
  data() {
    return {
      params: {},
      post: [],
      options: {
        currentPage: 0,
        direction: 'horizontal'
      }
    }
  },
  methods: {
    open(event) {
      this.params = event.params
      this.post = this.$store.getters.getPosts.find(item => item.id === this.params.id)
    },
    close() {
      this.$modal.hide('post-modal')
    }
  },
  computed: {
    id() {
      return this.params.id
    }
  },
  mounted() {
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
