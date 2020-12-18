<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <!-- 左侧菜单  -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" :key="i">
                  <li v-for="(sub,j) in item"  :key="j">
                    <a :href="sub?'/#/product/'+sub.id:''" >
                      <img :src="sub? sub.img: '/imgs/item-box-1.png'" alt="">
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a> 
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插电板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <!-- 轮播图 -->
        <swiper :options="swiperOption" >
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="'/#/product/'+item.id">
              <img :src="item.img" >
            </a>
          </swiper-slide>
          <!-- 轮播控件 -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 广告位 -->
      <div class="ads-box">
        <a :href="'/#/product'+item.id" v-for="(item,index) in adsList" :key="index" >
          <img v-lazy="item.img" >
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
            <img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr,i) in phoneList" :key="i">
              <div class="item" v-for="(item,j) in arr" :key="j">
                <span :class="{'new-pro':j%2==1}">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" alt="">
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subtitle}}</p>
                  <p class="price" @click="addCart(item.id)">{{item.price | price}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <!-- 模态弹出框  -->
    <modal 
    title="提示" sureText="查看购物车" 
    btnType="1"  
    modalType="middle" :showModal="showModal"
    @submit="goToCart"
    @cancel="showModal=false">
      <!-- 使用插槽添加提示语。注：插槽语法的变动 -->
      <template v-slot:body>
        <p>商品添加成功 ！</p>
      </template>
    </modal>
  </div>
</template>
<script>
import ServiceBar from "@/components/ServiceBar"
import Modal from "@/components/Modal"
import { swiper,swiperSlide} from 'vue-awesome-swiper'//注意:swiper6要大写
import 'swiper/swiper-bundle.css' //引入swiper样式文件

export default {
  name: 'index',
  components:{
    swiper,
    swiperSlide,
    ServiceBar,
    Modal
  },
  data(){
    return{
      swiperOption:{ //轮播选项配置
        autoplay:true,   //自动播放  
        loop:true,      //循环播放
        effect:'cube',  //指定动画
        cubeEffect:{   //动画具体配置(详见官网文档)
          shadowOffset:100,
          showScale:0.6
        },
        pagination:{ //指定将分页器渲染到哪个元素上
          el:'.swiper-pagination',
          clickable:true,  
        },
        navigation:{//指定将左右按钮渲染到哪个元素上
          nextEl:'.swiper-button-next',
          prevEl:'.swiper-button-prev',
        },
      },
      slideList:[
        {
          id:'42',
          img:'/imgs/slider/slide-1.jpg'
        },
        {
          id:'45',
          img:'/imgs/slider/slide-2.jpg'
        },
        {
          id:'46',
          img:'/imgs/slider/slide-3.jpg'
        },
        {
          id:'',
          img:'/imgs/slider/slide-4.jpg'
        },
      ],
      menuList:[
        [
          {
            id:30,
            img:'/imgs/item-box-1.png',
            name:'小米CC9'
          },
          {
            id:31,
            img:'/imgs/item-box-2.png',
            name:'小米8青春版'
          },
          {
            id:32,
            img:'/imgs/item-box-3.jpg',
            name:'Redmi K20 Pro'
          },
          {
            id:33,
            img:'/imgs/item-box-4.jpg',
            name:'移动4G专区'
          },
        ],
        [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
      ],
      adsList:[
        {
          id:33,
          img:'/imgs/ads/ads-1.png'
        },{
          id:48,
          img:'/imgs/ads/ads-2.jpg'
        },{
          id:45,
          img:'/imgs/ads/ads-3.png'
        },{
          id:47,
          img:'/imgs/ads/ads-4.jpg'
        },
      ],
      phoneList:[],
      showModal:false   //弹出框开关
    }
  },
  methods:{
    getList(){//获取商品列表
      this.axios.get('/products',{
        params:{
          categoryId:100012,
          pageSize:14
        }
      }).then(res=>{
        res.list=res.list.slice(6,14)
        this.phoneList=[res.list.slice(0,4),res.list.slice(4,8)]
      })
    },
    addCart(id){// 添加购物车
      this.axios.post('/carts',{ //参数由接口文档设计
        productId:id,   
        selected:true,  //加购物车后默认选中
      }).then(res=>{
        this.showModal=true;
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity)
      })
    },
    goToCart(){
      this.$router.push('/cart')
    }
  },
  mounted(){
    this.getList();
  }
}
</script>
<style lang="scss" >
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/config.scss';
.index{
  // 导航菜单
  .swiper-box{
    .nav-menu{
      position:absolute;
      width:264px;
      height:451px;
      z-index:9;
      padding:26px 0;
      background-color:#55585a7a;
      box-sizing:border-box;
      .menu-wrap{
        .menu-item{
          height:50px;
          line-height:50px;
          a{
            position:relative;
            display:block;
            font-size:16px;
            color:#ffffff;
            padding-left:30px;
            &:after{
              position:absolute;
              right:30px;
              top:17.5px;
              content:' ';
              @include bgImg(10px,15px,'/imgs/icon-arrow.png');
            }
          }
          &:hover{
            background-color:$colorA;
            .children{
              display:block;
            }
          }
          // hover显示的菜单栏
          .children{
            display:none;
            width:962px;
            height:451px;
            background-color:$colorG;
            position:absolute;
            top:0;
            left:264px;
            border:1px solid $colorH;
            ul{
              display:flex;
              justify-content:space-between;
              height:75px;
              li{
                height:75px;
                line-height:75px;
                flex:1;
                padding-left:23px;
              }
              a{
                color:$colorB;
                font-size:14px;
              }
              img{
                width:42px;
                height:35px;
                vertical-align:middle;
                margin-right:15px;
              }
            }
          }
        }
      }
    }
    // 轮播样式修改
    .swiper-container {
      height: 451px;
      .swiper-button-prev{
        left:274px;
      }
      img{
        width:100%;
        height:100%;
      }
    }  
  }
  // 广告位
  .ads-box{
    @include flex();
    margin:14px 0 31px 0;
    a{
      width:296px;
      height:167px;
    }
  }
  .banner{
    margin-bottom:50px;
  }
  // 手机列表
  .product-box{
    background-color:$colorJ;
    padding:30px 0 50px;
    h2{
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color:$colorB;
      margin-bottom: 20px;
    }
    .wrapper{
      display: flex;
      .banner-left{
        margin-right: 16px;
        img{
          width:224px;
          height: 619px;
        }
      }
      .list-box{
        .list{
          @include flex();
          margin-bottom: 14px;
          width:100%;
          &:last-child{
            margin-bottom:0;
          }
          .item{
            width:236px;
            height: 302px;
            background-color:$colorG;
            text-align: center;
            margin-right:10px;
            span{
              display: inline-block;
              width:67px;
              height:24px;
              font-size: 14px;
              line-height: 24px; //设置行高自动居中
              color:$colorG;
              // 使用伪类按class取值动态切换不同标签的样式
              &.new-pro{ //新品样式 
                background: #7ecf68;
              }
              &.kill-pro{ //秒杀商品样式
                background: #e82626;
              }
              
            }
            .item-img{
              img{
                height: 195px;
                width:100%;
              }
            }
            .item-info{
              h3{
                font-size: $fontJ;
                color:$colorB;
                line-height: $fontJ;
                font-weight: bold;
              }
              p{
                color:$colorD;
                line-height: 13px;
                margin:6px 0 13px;
              }
              .price{
                color:#f20;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer; //光标显示为手
                &:after{ //伪类添加购物车图标
                  @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                  content:'';
                  margin-left:5px;

                }
              }
            }
          }
        }
      }
    }
  }
}
</style>