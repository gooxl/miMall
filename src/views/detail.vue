<template>
  <div class="detail">
     <!-- 商品参数组件 -->
    <product-param :title="product.name"></product-param>
    <!-- 商品详情 -->
    <div class="wrapper">
      <div class="container">
        <!-- 左轮播 -->
        <div class="swiper">
          <swiper :options="swiperOption">
            <swiper-slide><img src="/imgs/detail/phone-1.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/detail/phone-2.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/detail/phone-3.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/detail/phone-4.jpg" alt=""></swiper-slide>
            <!-- 轮播控件 -->
            <div class="swiper-pagination" slot='pagination'></div>
          </swiper>
        </div>
        <!-- 右商品信息 -->
        <div class="content">
          <h2 class="title">{{product.name}}</h2>
          <p class="info">相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
          外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
          <div class="delivery">小米自营</div>
          <div class="price">{{product.price}}元<span class="del">1999元</span></div>
          <div class="line"></div>
          <div class="addr-box">
            <i class="icon-loc"></i>
            <div class="addr">北京 北京市 朝阳区 安定门街道</div>
            <div class="stock">有现货</div>
          </div>
          <div class="version">
            <h2>选择版本</h2>
            <div class="phone" :class="{'checked':version==1}" @click="version=1">6GB+64GB 全网通</div>
            <div class="phone" :class="{'checked':version==2}" @click="version=2">4GB+64GB 移动4G</div>
          </div>
          <div class="color-box " >
            <h2>选择颜色</h2>
            <div class="phone checked">
              <span class="color"></span>
              深空灰
            </div>
          </div>
          <div class="total-box">
            <div class="phone-info">
              <div>{{product.name}} | {{version==1?"6GB+64GB 全网通 深灰色":"4GB+64GB 移动4G"}} | 深空灰</div>
              <div class="total">总计 : {{product.price}}元</div>
            </div>
          </div>
          <div class="btn-group">
            <a href="javascript:;" class="btn btn-huge" @click="addCart">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 价格说明 -->
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="/imgs/detail/item-price.jpeg" alt="">
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal title="提示" sureText="查看购物车" 
    btnType="1"  modalType="middle" :showModal="showModal"
    @submit="goToCart" @cancel="showModal=false">
      <template v-slot:body>
        <p>商品添加成功 ！</p>
      </template>
    </modal>
  </div>  
</template>

<script>
import ProductParam from '../components/ProductParam.vue'
import ServiceBar from '../components/ServiceBar.vue'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import Modal from '../components/Modal.vue'

export default {
  name:'detail',
  components: { ProductParam, ServiceBar,swiper,swiperSlide,Modal},
  data(){
    return {
      showModal:false,//弹出框开关
      id:this.$route.params.id,
      product:{},
      version:1,  //版本变量 
      swiperOption:{
        autoplay:true,
        loop:true,      //循环播放
        effect: 'cube',
        grabCursor: true, //指针会变成手掌形状
        pagination: {  //分页器
          el: '.swiper-pagination',
          clickable :true,
        },
        cube: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94
        }
      }
    }
  },
  methods:{
    getProductInfo(){
      this.axios.get(`/products/${this.id}`).then(res=>{
        this.product=res
      })
    },
    addCart(){ //添加购物车
      this.axios.post('/carts',{
        productId:this.id,
        selected:true        
      }).then((res={cartProductVoList:0})=>{//设置购物车数量默认为0，undefined会报错
        // 更新vuex的购物车数量
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity)
        this.showModal=true; //显示模态框
      })
    },
    goToCart(){
      this.$router.push('/cart')
    }
  },
  mounted(){
    this.getProductInfo();
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/config.scss';
.detail{
  .wrapper{
    .container{
      @include flex();
      .swiper{
        width:50%;
        img{
          width:100%;
          height:100%;
        }
      }
      .content{
        width:50%;
        height:100%;
        .title{
          font-size: 28px;
          // height:26px;
          margin:30px auto 16px;
        }
        .info{
          font-size: 14px;
          height: 36px;
        }
        .delivery{
          font-size:16px;
          color:$colorA;
          margin:26px auto 14px;
          // height:15px;
        }
        .price{
          font-size: 20px;
          color:$colorA;
          .del{
            font-size: 16px;
            color:$colorD;
            margin-left:10px;
            text-decoration: line-through;
          }
        }
        .line{
          height:0;
          margin:25px auto 28px;
          border-top:1px solid $colorH;
        }
        .addr-box{
          height:108px;
          background:$colorK;
          border:1px solid $colorH;
          box-sizing: border-box;
          padding:31px 0 0 64px;
          font-size: 14px;
          line-height: 14px;
          position:relative;
          .icon-loc{
            position:absolute;
            top:27px;
            left:34px;
            @include bgImg(20px,20px,'/imgs/detail/icon-loc.png');
          }
          .addr{
            color:$colorC;
          }
          .stock{
            margin-top:15px;
            color:$colorA;
          }
        }
        .version,.color-box{
          margin-top:15px;
          h2{
            font-size: 18px;
            margin-bottom: 10px;
          }
          .phone{
            width:287px;
            height: 50px;
            line-height:50px;
            font-size:16px;
            color:$colorB;
            border:1px solid $colorH;
            box-sizing: border-box;
            text-align: center;
            display: inline-block;
            margin-right:10px;
            cursor:pointer;
            span{
              color:$colorC;
              margin-left:15px;
            }
            .color{
              display: inline-block;
              width:14px;
              height:14px;
              background:$colorC;
            }
            &.checked{
              border:1px solid $colorA;
              color:$colorA;
            }
          }
        }
        .total-box{
          height:108px;
          background:$colorK;
          padding:24px 33px 10px 30px;
          font-size: 14px;
          margin:20px auto 20px;
          box-sizing: border-box;
          .total{
            font-size: 24px;
            color:$colorA;
            margin-top:18px;
          }
        }
      }
    }
    .price-info{
      background:#333;
      height:340px;
      h2{
        font-size: 24px;
        color:$colorB;
        padding-top:38px;
        margin-bottom:30px;
      }
    }
  }
}

</style>