<template>
  <div class="product">
    <!-- 商品参数组件 -->
    <product-param :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="goToBuy">立即购买</button>
      </template>
    </product-param>
    <!-- 商品业内容 -->
    <div class="content">
      <div class="item-bg">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href="" id="">全球首款双频 GP</a>
          <span>|</span>
          <a href="" id="">骁龙845</a>
          <span>|</span>
          <a href="" id="">AI 变焦双摄</a>
          <span>|</span>
          <a href="" id="">红外人脸识别</a>
        </p>
        <div class="price">
          <span>￥<em>{{product.price}}</em></span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper :options="swiperOption">
            <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="video-bg" @click="showSlide=true"></div>
        <div class="video-box" >
          <div class="overlay" v-if="showSlide"></div>
          <div class="video" :class="{'slide':showSlide}">
            <span class="icon-close" @click="closeVideo"></span>
            <video src="/imgs/product/video.mp4" muted autoplay controls="controls" ref="video"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParam from '../components/ProductParam.vue';
import {swiper,swiperSlide} from 'vue-awesome-swiper'

export default {
  name:'product',
  components:{
    swiper,
    swiperSlide,
    ProductParam
  },
  data(){
    return{
      showSlide:false, //控制视频显示开关
      product:{},  //商品信息
      swiperOption:{
        autoplay:true,
        spaceBetween: 20,//在slide之间设置距离
        freeMode: true, //设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
        grabCursor: true,  //指针会变成手掌形状
        slidesPerView: 3,//slider容器能够同时显示的slides数量
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        }
      }
    }
  },
  methods:{
    goToBuy(){
      let id=this.$route.params.id;
      this.$router.push(`/detail/${id}`)
    },
    getProductInfo(){
      let id=this.$route.params.id;
      this.axios.get(`/products/${id}`).then(res=>{
        this.product=res;
      })
    },
    closeVideo(){
      this.showSlide=false;
      let video=this.$refs.video;
    } 
  },
  mounted(){
    this.getProductInfo();
  }
}
</script>
    

<style  lang="scss">
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/config.scss";
.product{
  .content{
    .item-bg{
      @include bgImg(100%,718px,'/imgs/product/product-bg-1.png',cover);
      text-align: center;
      h2{
        font-size: 80px;
        padding-top:55px;
      }
      h3{
        font-size:24px;
        letter-spacing:10px;
      }
      p{
        margin:21px 0 40px 0;
        a{
          font-size: 16px;
          color:$colorB;
        }
        span{
          margin: 0 15px;
        }
      }
      .price{
        font-size: 30px;
        color:$colorB;
        em{
          font-style:normal;
          font-size:38px;
          margin-left:10px;
        }
      }
    }
    .item-bg-2{
      @include bgImg(100%,480px,'/imgs/product/product-bg-2.png',1226px 397px)
    }
    .item-bg-3{
      @include bgImg(100%,638px,'/imgs/product/product-bg-3.png',cover)
    }
    .item-swiper{
      width:100%;

      margin:36px auto 52px;
      .desc{
        font-size: 18px;
        color:$colorB;
        text-align: center;
      }
      img{ 
        width:100%;
      }
    }
    .item-video{
      height:1044px;
      background:$colorI;
      margin-bottom:76px;
      color:$colorG;
      text-align: center;
      h2{
        font-size:60px;
        padding-top:82px;
        margin-bottom: 47px;
      }
      p{
        font-size: 24px;
        margin-bottom:58px;
      }
      .video-bg{
        @include bgImg(1226px,540px,'/imgs/product/gallery-1.png',cover);
        margin:0 auto 120px;
        cursor:pointer;
      }
      .video-box{
        .overlay{ //遮罩层
          @include position(fixed);
          background:$colorB;
          opacity: .4;
          z-index:10;
        }
        .video{
          @include position(fixed,-50%,50%,1000px,536px);
          transform:translate(-50%,-50%);
          z-index:10;
          opacity: 0;
          transition:all .4s;
          &.slide{ //默认top为-50%隐藏，当点击视频区域时过渡为50%
            top:50%;
            opacity: 1;
          }
          .icon-close{
            @include bgImg(20px,20px,'/imgs/icon-close.png');
            position:absolute;
            top:20px;
            right:20px;
            cursor: pointer;
            z-index: 11;
          }
          video{
            width:100%;
            height:100%;
            object-fit: cover;
          }
        }
      }
    }

  }

  .btn{
    margin-left:11px;
  }
}

</style>