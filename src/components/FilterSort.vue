<template>
  <div class="filter">
  <div class="select" v-click-outside="hide">
    <inline-svg src="./img/choose-category.svg" class="select-choose"/>
    <inline-svg src="./img/row-dwn.svg" class="select-row"/>
    <input type="text" placeholder="Choose Category" readonly v-model="categorie" @click="active = !active"  />
    <div class="select-hidden" :class="{'select-active': active}">
      <span v-for="category in categories" :key="category.id" @click="selectCategorie(category)">{{category.name}}</span>
    </div>
  </div>
    <div class="filter__input-group">
      <input type="text" placeholder="Price from (USD)" v-model="priceFrom" @input="filterPosts">
    </div>
    <div class="filter__input-group">
      <input type="text" placeholder="Price to (USD)" v-model="priceTo" @input="filterPosts">
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  data(){
    return{
      priceFrom: null,
      priceTo: null,
      categorie: '',
      active: false,
    }
  },
  methods:{
    filterPosts(){
      this.$emit('setFilter', this.priceFrom, this.priceTo)
    },
    selectCategorie(item) {
      this.categorie = item.name
      this.$emit('selectCategorie', item)
      this.hide()
    },
    hide(){
      this.active = false
    }
  },
  computed:{
    categories(){
      const categoires = this.$store.getters.getCategories;
      categoires.unshift({
        id: new Date().toLocaleString(),
        name: 'All'
      })
      return categoires
    }
  },
  directives: {
    ClickOutside
  }


}
</script>
