<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="">小米商城</a><span>|</span>
      <a href="">米家</a><span>|</span>
      <a href="">米聊</a><span>|</span>
      <a href="">政企服务</a><span>|</span>
      <a href="">小米天猫店</a><span>|</span>
      <a href="">小米集团隐私政策</a>
    </div>
    <div class="copyright">Copyright ©2020 <span class="domain">mi.futurefe.com</span> All Rights Reserved.</div>
  </div>
</template>

<script>
export default {
  name:"nav-footer"
}
</script>

<style lang="scss" >
@import '@/assets/scss/config.scss';
  .footer{
    height:234px;
    border-top:4px solid $colorA;
    background-color:$colorB;
    color:$colorD;
    font-size: 16px;
    text-align: center;
    .footer-logo{
      margin:46px 0 31px 0;
      img{
        width:53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      a{
        color:$colorD;
        display: inline-block;
      }
      span{
        margin:0 10px;
      }
      margin-bottom: 13px;
    }
    .copyright{
      .domain{
        color:$colorA
      }
    }
  }
</style>