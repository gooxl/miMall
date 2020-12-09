<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <!-- 购物车列表 -->
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <!-- 头 -->
          <ul class="cart-head">
            <li class="col-1">       
              <span class="checkbox" :class="{'checked':allChecked}" @click="toggleAll"></span>
            全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <!-- 商品列表 -->
          <ul class="cart-list">
            <li class="cart-item" v-for="(item,index) in list" :key="index">
              <div class="item-check">
                <span class="checkbox" :class="{'checked':item.productSelected}" @click="updateCart(item)"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{item.productName + ' ，' + item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-count">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <!-- 底部合计&结算 -->
        <div class="order-wrap">
          <div class="cart-tip">
            <a href="/">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn btn-large" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>

  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import NavFooter from '@/components/NavFooter'
import ServiceBar from '../components/ServiceBar.vue'

export default {
  name: 'cart',
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar,
  },
  data(){
    return{
      allChecked:false,//是否全选
      list:[],  //商品列表
      cartTotalPrice:0,  //商品总额
      checkedNum:0,   //选中商品数量 
    }
  },
  methods:{
    // 获取购物车列表
    getCartList(){
      this.axios.get('/carts').then(res=>{
        this.renderData(res)
      })
    },
    // 更新购物车数量和商品单选状态
    updateCart(item,type){
      let quantity=item.quantity,  //商品数量
          selected=item.productSelected;  //是否选中
      if(type=='-'){ 
        if(quantity==1){
          this.$message.warning('不能少于1件')
          return //商品数量不能少于1
        } 
        --quantity    
      }else if(type=='+'){
        if(quantity>item.productStock){//商品数量不能大于库存数
          this.$message.warning('没有更多啦')
          return;
        }
        ++quantity;
      }else{ //不是按-或+即是按选中框，将当前商品选中状态取反
        selected=!item.productSelected;
      }
      // 最后再传入最新参数去请求购物车数据
      this.axios.put(`/carts/${item.productId}`,{
        quantity,
        selected
      }).then(res=>{
        this.renderData(res);
      })
    },
    // 删除购物车商品
    delProduct(item){
      this.axios.delete(`/carts/${item.productId}`).then(res=>{
        this.renderData(res); 
        this.$message.success('删除成功')
      })
    },
    // 购物车下单
    order(){
      //先判断购物车每一件商品是否选中状态
      // every返回的是bool值，只要有一个为false则返回false,全部true才返回true
      // productSelected表示商品是否选中，every取反表示里面没有一个选中
      let isCheck=this.list.every(item=>!item.productSelected)
      if(isCheck){ //如果没有选中商品
        this.$message.warning('请选择一件商品')
      }else{
        this.$router.push('/order/confirm')
      }
    },
    // 控制全选
    toggleAll(){
      // 不同选中状态调用相应接口
      let url=this.allChecked?'/carts/unSelectAll':'/carts/selectAll';
      this.axios.put(url).then((res)=>{
        this.renderData(res)
      })
    },
    // 公共赋值
    renderData(res){ //接收请求返回的res数据
      this.list = res.cartProductVoList || [];  //购物车列表
      this.allChecked = res.selectedAll;     //是否全选
      this.cartTotalPrice = res.cartTotalPrice;  //合计金额
      //使用过滤：返回过滤好的数组
      //只返回选中为true的数组的长度
      this.checkedNum=this.list.filter(item=>item.productSelected).length; //选中的商品数量
      // 注：如果有多个过滤参数时不能使用以上简写
      /*filter(item=>{
          return item.productSelected;
                 参数2...
        })
      */
    }
  },
  mounted(){
    this.getCartList()
  }

}
</script>
<style lang="scss">
@import '@/assets/scss/config.scss';
.cart{
  .wrapper{
    background:$colorJ;
    padding:30px 0 114px;
    .cart-box{
      background:$colorG;
      font-size: 14px;
      color:$colorD;
      text-align: center;
      .checkbox{
        display: inline-block;
        width:22px;
        height:22px;
        border: 1px solid $colorH;
        vertical-align: middle;
        margin-right:17px;
        cursor: pointer;
        &.checked{
          background:url('/imgs/icon-gou.png') $colorA no-repeat center;
          background-size: 16px 12px;
          border:none;
        }
      }
      .cart-head{
        display: flex;
        height:79px;
        line-height: 79px;
        .col-1{
          flex:1
        }
        .col-2{
          flex:2
        }
        .col-3{
          flex:3
        }
      }
      .cart-list{
        .cart-item{
          display:flex;
          align-items: center;
          height:160px;
          border-top:1px solid $colorH;
          font-size: 16px;
          .item-check{
            flex:1
          }
          .item-name{
            flex:3;
            font-size: 18px;
            color:$colorB;
            display: flex;
            align-items: center;
            img{
              width:80px;
              height:80px;
              vertical-align: middle;
            }
            .span{
              margin-left:30px;
            }
          }
          .item-price{
            flex:1;
            color:$colorB;
          }
          .item-count{
            flex:2;
            .num-box{
              display:inline-block;
              width:150px;
              height: 40px;
              line-height:40px;
              border:1px solid $colorH;
              font-size: 14px;
              a{
                display:inline-block;
                width:50px;
                color:$colorB;
              }
              span{
                display:inline-block;
                width:50px;
                color:$colorB;
              }
            }
          }
          .item-total{
            flex:1;
            color:$colorA;
          }
          .item-del{
            flex:1;
            width:14px;
            height:12px;
            background:url('/imgs/icon-close.png')no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap{
      font-size: 14px;
      color:$colorC;
      margin-top:20px;
      height:50px;
      line-height: 50px;
      .cart-tip{
        float:left;
        margin-left:29px;
        a{
          color:$colorC;
          margin-right:37px;
        }
        span{
          color:$colorA;
          margin:0 50px;
        }
      }
      .total{
        font-size: 14px;
        color:$colorA;
        float:right;
        span{
          font-size: 24px;
        }
        a{
          width:202px;
          height:50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
