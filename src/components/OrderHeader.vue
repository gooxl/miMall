<template>
  <!-- 订单类页面公共头 -->
  <div class="order-header">
    <div class="container clearfix">
      <!-- 左logo -->
      <div class="header-logo">
        <a href="/"></a>
      </div>
      <div class="title">
        <h2>{{title}}<slot name="tip"></slot></h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name:"order-header",
  props:{
    title:String
  },
  computed:{
    ...mapState(['username'])
  },
}
</script>

<style lang="scss" >
  .order-header{
    padding:30px 0;
    border-bottom:2px solid #ff6600;
    .header-logo{
      float:left;
    }
    .title,.username{
      display: inline-block;
      height:55px;
      line-height: 55px;
    }
    .title{
      font-size: 20px;
      float:left;
      color:#333;
      padding-left:54px;
      span{
        font-size:14px;
        margin-left:17px;
        color:#999;
        font-weight: 200;
      }
    }
    .username{
      float:right;
      margin-right:50px;
      a{
        color:#666;
        font-size:16px;
      }
    }
  }
</style>