<template>
  <div class="home">
    home
    <nav-header></nav-header>
    <router-view/>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import navHeader from '@/components/NavHeader'
import navFooter from '@/components/NavFooter'
export default {
  name: 'Home',
  components: {
    navHeader,
    navFooter
  }
}
</script>
