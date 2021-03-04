<template>
  <div class="create-post">
    <Header :isLayout="true"/>
    <div class="create-post__container">
      <h1 class="title">Add product</h1>
      <form @submit.prevent="submit">
        <div class="create-post__input-group">
          <label for="title">Title <span class="required">*</span></label>
          <input type="text" id="title" placeholder="For example: Iron man suit" required v-model="title"/>
        </div>
        <div class="create-post__input-group">
          <label for="location">Location <span class="required">*</span></label>
          <input type="text" id="location" placeholder="For example: Los Angeles, CA" required v-model="location"/>
        </div>
        <div class="create-post__input-group">
          <label for="category">Category <span class="required">*</span></label>
          <input type="text" id="category" placeholder="For example: Small" required v-model="category"/>
        </div>
        <div class="create-post__input-group">
          <label for="description">Description</label>
          <textarea id="description" rows="5" placeholder="For example: Iron man suit"  v-model="description"/>
        </div>
        <div class="create-post__input-group">
          <label for="photos">Photos</label>
          <div class="photos-block" id="photos">
            <div class="add-photos" @click="addPhoto"></div>
            <input type="file" ref="input1"
                   style="display: none"
                   multiple
                   @change="previewImage" accept="image/*" >
            <div v-if="imgs!=null">
              <img class="preview" height="268" width="356" v-for="image in imgs" :key="image.id" :src="image.path">
            </div>
          </div>
        </div>
        <div class="create-post__input-group">
          <label for="price">Price</label>
          <input type="text" id="price" placeholder="For example: 546" required v-model="price"/>
        </div>
        <span class="error" v-if="error">{{error}}</span>
        <button class="button">
          SUBMIT
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import firebase from "firebase";

export default {
  name: 'create-post',
  components: {Header},
  data() {
    return {
      title: '',
      location: '',
      category: '',
      description: '',
      price: '',
      error: '',
      uploadValue:0,
      img: null,
      img1: null,
      imgs:[],
      imageData:null,
      imageDataArr:[]
    }
  },
  methods: {
    addPhoto(){
      this.$refs.input1.click()
    },
    previewImage(event) {
      this.uploadValue=0;
      this.img=null;
      console.log(event.target.files)
      event.target.files.forEach(item => {
        this.imageDataArr.push(item)
      })
      console.log( this.imageDataArr)
      this.imageData = event.target.files[0];
      this.onUpload()
    },
    onUpload(){
      this.img=null;
      this.imageDataArr.forEach(item => {
        const storageRef=firebase.storage().ref(`${item.name}`).put(item);
        storageRef.on(`state_changed`,snapshot=>{
              this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
              storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.imgs.push({
                  id: item.name,
                  path: url
                }) ;
                console.log(this.imgs)
              });
            }
        );
      })

    },
    submit() {
      if (this.title && this.location && this.price) {
        const post = {
          title: this.title,
          location: this.location,
          category: this.category,
          description: this.description,
          price: this.price,
          img: this.imgs,
          favourite: false
        };
        this.$store.dispatch('addPost', post).then(() => {
          this.$router.push('/');
          this.title = this.location = this.description = this.price = ''
        }).catch(e => {
          this.error = e.message
        })
      } else {
        this.error = 'Error, some fields are not filled'
      }
    }
  }
}
</script>
