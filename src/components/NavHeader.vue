<template>
  <div class="header">
    <!-- topbar -->
    <div class="nav-topbar">
      <div class="container">
        <!-- 顶部左 -->
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <!-- 顶部右 -->
        <div class="topbar-user">
            <a href="javascript:;" v-if="username">{{username}}</a>
            <a href="javascript:;" v-if="username" @click="logout">退出</a>
            <a href="/#/order/list" v-if="username">我的订单</a>
            <a href="/#/login" v-if="!username" >登录</a>
            <a href="javascript:;" v-if="!username" >注册</a>
            <a href="/#/cart" class="my-cart" >
              <span class="icon-cart"></span>购物车({{cartCount}})
            </a>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <div class="nav-header">
      <div class="container">
        <!-- 左logo -->
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-logo2">
          <a href="javascript:;"></a>
        </div>
        <!-- 中menu -->
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul v-for="(item,index) in phonelist.slice(0,6)" :key="index">
                <li class="product">
                  <!-- target="_blank"在新窗口打开 -->
                  <a :href="'/#/product/'+item.id" target="_blank"> 
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price}}元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>小米电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <!-- target="_blank"在新窗口打开 -->
                  <a href="" target="_blank"> 
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <!-- target="_blank"在新窗口打开 -->
                  <a href="" target="_blank"> 
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <!-- target="_blank"在新窗口打开 -->
                  <a href="" target="_blank"> 
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <!-- target="_blank"在新窗口打开 -->
                  <a href="" target="_blank"> 
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">16999元</div>
                  </a>
                </li>
                <li class="product">
                  <!-- target="_blank"在新窗口打开 -->
                  <a href="" target="_blank"> 
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
        <!-- 右搜索框 -->
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'; //可使用mapActions函数辅助vuex
export default {
  name:"nav-header",
  data(){
    return{
      phonelist:[],
    }
  },
  computed:{
    /*username(){
      return this.$store.state.username
    },
    cartCount(){
      return this.$store.state.cartCount
    }*/
    ...mapState(['username','cartCount']), //可使用...mapState辅助简化，功能等同上
  },
  
  methods:{
    getProductList(){
      this.axios.get('/products',{
        params:{
          categoryId:'100012',
          pageSize:6
        }
      }).then(res=>{
        this.phonelist=res.list
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res=0)=>{
        this.$store.dispatch('saveCartCount',res)
      })
    },
    logout(){
      this.axios.post('/user/logout').then(()=>{
        this.$message.success('退出成功');
        this.$cookie.set('userId','',{expires:'-1'}) //清除cookie
        this.$store.dispatch('saveUserName','') //清除vuex保存的用户名
        this.$store.dispatch('saveCartCount','0') //清除vuex保存的购物车数量
      })
    }
  },
  mounted(){
    this.getProductList()
    let params=this.$route.params
    //如果params为true且等于login才重新获取购物车数量
    if(params && params.from =="login"){
      this.getCartCount();
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/base.scss';
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/config.scss';
  .header{
    //  topbar
    .nav-topbar{
      @include height(39px);
      background-color:$colorB;
      color:#b0b0b0;
      .container{
        @include flex(); //调用mixin定义好的flex布局复用方法
        a{
          display: inline-block;
          color:#b0b0b0;
          margin-left:17px;
        }
        .my-cart{
          width:110px;
          background-color:$colorA;
          color:$colorG;
          text-align: center;
          .icon-cart{
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
            margin-right:4px;
          }
        }
      }
    }
    // 导航栏
    .nav-header{
      .container{
        position: relative;
        height: 112px;
        @include flex();
        .header-logo2{
          padding-left:20px;
          display:inline-block;
          a{
            display:inline-block;
            width:165px;
            height:55px;
            background:url('/imgs/mi1212.jpg')
          }
        }
        .header-menu{
          display:inline-block;
          width: 643px;
          padding-left:25px;
          .item-menu{
            display:inline-block;
            color:$colorB;
            font-weight:bold;
            font-size:16px;
            line-height: 112px;
            margin-right:20px;
            span{
              cursor: pointer;  //鼠标移入点手图标
            }
            // 鼠标移入目标元素显示隐藏菜单
            &:hover{
              color:$colorA;
              .children{
                height: 220px;
                opacity: 1;
              }
            }
            // 隐藏的菜单栏
            .children{
              position: absolute;
              top:112px;
              left:0;
              width:1226px;
              height:0;
              opacity: 0;  //隐藏shadow
              overflow: hidden;  //隐藏溢出元素
              transition:all .3s;
              border-top:1px solid $colorH;
              box-shadow:0px 7px 6px 0px rgba($color: #000000, $alpha: 0.11);
              z-index: 10;
              background-color:#fff;
              .product{
                float:left;
                width:16.6%;
                height:220px;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                position: relative;
                a{
                  display: inline-block;
                }
                img{
                  height:111px;
                  width:auto;
                  margin-top:26px;
                }
                .pro-img{
                  height: 137px;
                }
                .pro-name{
                  font-weight: bold;
                  margin-top:19px;
                  margin-bottom:8px;
                  color:$colorB;
                }
                .pro-price{ 
                  color:$colorA;
                }
                //通过伪类的方式给每个li之间添加分隔线
                &::before{
                  content:' '; 
                  position: absolute;
                  top:28px;
                  right:0;
                  border-left:1px solid $colorH;
                  height: 100px;
                  width:1px;
                }
                &:last-child:before{
                  display:none;
                }
              }
            }
            
          }
        }
        .header-search{
          width:319px;
          .wrapper{
            height:50px;
            border: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            input{
              border:none;
              border-right:1px solid #e0e0e0;
              box-sizing: border-box;
              width:264px;
              height:50px;
              padding-left:14px;
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png');
              margin-left:17px;
            }
          }
        }
      }
    }
  }
</style>