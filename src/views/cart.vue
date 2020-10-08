<template>
  <div class="cart">
    <order-header></order-header>
    cart
    <router-view/>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import NavFooter from '@/components/NavFooter'
export default {
  name: 'cart',
  components: {
    OrderHeader,
    NavFooter
  }
}
</script>
