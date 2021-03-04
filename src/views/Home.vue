<template>
  <div class="home">
    <div class="home-wrapper">
      <Header :isLayout="true"/>
      <div class="container-fluid">
        <Search @setSearch="setSearch" />
      </div>
    </div>
    <div class="container-fluid">
      <FilterSort @setFilter="setFilter" @selectCategorie="setCategorie"/>
      <template v-if="$store.state.loader">
        <Loader/>
      </template>
     <template v-else>
       <template v-if="filterPosts.length">
         <PostList :posts="filterPosts" />
       </template>
       <PostList v-else :posts="!this.$store.state.posts.favourite ? searchPosts : favoritePosts " />
     </template>
    </div>
    <Modal/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Search from "@/components/Search";
import FilterSort from "@/components/FilterSort";
import PostList from "@/components/PostList";
import Modal from "@/components/modals/Modal";
import Loader from "@/components/Loader";

export default {
  name: 'home',
  components: {Header, Search, FilterSort, PostList,Modal, Loader},
  data(){
    return{
      searchTitle:'',
      searchLocation:'',
      selectCategorie:'',
      priceFrom: null,
      priceTo: null,
    }
  },
  computed:{
    searchPosts(){
     return  this.$store.getters.getPosts.filter(item => {
        if (item.title.indexOf(this.searchTitle) > -1  && item.location.indexOf(this.searchLocation) > -1 ) {
          return item;
        }
      })
    },
    favoritePosts(){
      return this.$store.getters['getPostsFavourite']
    },
    filterPosts(){
      return  this.$store.getters.getPosts.filter(item => {
        if (+item.price >= Number(this.priceFrom) && +item.price <= Number(this.priceTo)
            || this.selectCategorie.name && this.selectCategorie.name === item.category ) {
          return item;
        }

      })
    }
  },
  methods:{
    setSearch(title, location){
      this.searchTitle = title
      this.searchLocation = location
    },
    setFilter(priceFrom, priceTo) {
      this.priceFrom = +priceFrom;
      this.priceTo = +priceTo;
    },
    setCategorie(item){
      this.selectCategorie = item
    }

  },
  mounted() {
    this.$store.dispatch('initPosts');
    if (!!this.$route.query.favourite === true) {
      this.$store.state.posts.favourite = true
    }
  }
}
</script>
