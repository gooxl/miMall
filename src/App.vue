<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name:'app',
  data(){
    return{

    }
  },
  mounted(){
    if(this.$cookie.get('userId')){ //如果有userId才获取用户名和购物车数量
      this.getUser();
      this.getCartCount();
    }

  },
  methods:{
    getUser(){
      this.axios.get('/user').then((res={})=>{
        console.log(res)
        this.$store.dispatch('saveUserName',res.username)
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res=0)=>{
        this.$store.dispatch('saveCartCount',res)
      })
    }
  },  
}
</script> 


<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';


</style>
