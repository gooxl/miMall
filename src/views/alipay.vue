<template>
  <div class="alipay">
    <!-- 支付接口会返回一段html源码，使用v-html赋值到div里加载 -->
    <div class="form" v-html="content"></div>
    <!-- 跳转至支付页面需要等待，设置loading提高体验 -->
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue';

export default {
  components: { Loading },
  name: 'alipay',
  data(){
    return{
      orderId:this.$route.query.orderId, 
      content:'',  //保存接口返回的html代码
      loading:false,
    }
  },
  methods:{
    paySubimt(){ 
      this.axios.post('/pay',{
        orderId:this.orderId,
        orderName:'gu商城商品', //扫码支付时订单名称
        amount:0.01, //单位元
        payType:1, //1支付宝，2微信
      }).then(res=>{
        this.content=res.content;//保存返回的代码段
        this.loading=true;
        setTimeout(()=>{ //跳转至支付页面需要等待，需要设置定时器，否则无法跳转
          //获取返回的form元素，并调用它的脚本
          //可使用document.getElementById获取，表单元素可直接document.forms获取
          document.forms[0].submit() 
        },100)
      })
    }
  },
  mounted(){
    this.paySubimt()
  }
}
</script>