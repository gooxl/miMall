<template>
  <div class="order">
    <router-view/>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '@/components/NavFooter'
import ServiceBar from '../components/ServiceBar.vue'
export default {
  name: 'order',
  components: {
    NavFooter,
    ServiceBar,
  },
  data(){
    return{
    }
  },
  mounted(){
    
  }
}
</script>
    
