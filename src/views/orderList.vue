<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>订单列表</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box" >
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order,index) in orderList" :key="index" >
            <div class="order-title"  >
              <div class="item-info fl">
                {{order.createTime}}<span>|</span>
                {{order.receiverName}}<span>|</span>
                订单号：{{order.orderNo}} <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list"  v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.currentUnitPrice}}元  x  {{item.quantity}}</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status==20">
                <a href="javascript:;" >{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <no-data v-if="!loading && orderList.length==0"></no-data>
          <!-- 分页器 -->
          <!-- <el-pagination
            class="pagination"
            background
            layout="prev, pager, next,jumper"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
          /> -->
          <!-- 滚动加载分布数据 -->
          <div class="scroll-more"
            v-infinite-scroll="scrollMore" 
            infinite-scroll-disabled="busy" 
            infinite-scroll-distance="410"
          >
          <!-- v-infinite-scroll="scrollMore" //绑定滚动触发的方法
          infinite-scroll-disabled="busy"//当busy变量为true才触发事件 
          infinite-scroll-distance="410"//离底部的距离为多少时触发事件，单件px(计算低部所有组件有多高) -->
            <img src="/imgs/loading-svg/loading-bubbles.svg" alt="" v-show="loading">
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Loading from '../components/Loading.vue'
import NoData from '../components/NoData.vue'
import OrderHeader from '../components/OrderHeader.vue'
import { Pagination } from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll' //滚动加载插件

export default {
  components: { 
    OrderHeader,
     Loading, 
     NoData,
     //elementUI的标签名都要带el，
     [Pagination.name]:Pagination,
  },
  directives: {infiniteScroll}, //配置infiniteScroll插件
  name: 'order-list',
  data(){
    return{
      orderList:'',  
      loading:false,
      pageSize:10,
      pageNum:1,
      total:0,
      busy:false, //是否触发滚动加载插件,true关闭
    }
  },
  methods:{
    //首次加载数据
    getOrderList(){ 
      this.loading=true;
      this.busy=true; //禁用滚动加载
      this.axios.get('/orders',{
        params:{
          pageNum:this.pageNum
        }
      }).then(res=>{
        this.orderList=res.list;
        this.total=res.total;
        this.loading=false;
        this.busy=false; //当数据加载好再启用滚动加载
      }).catch(()=>{
        this.loading=false;
      })
    },
    goPay(orderNo){
      this.$router.push('/order/pay?orderNo='+orderNo)
    },
    // 分页显示方式一：分页器(elementUI)
    // current-change方法会回调参数：当前页; （见文档）
    handleChange(pageNum){ 
      this.pageNum=pageNum //保存当前的页码
      this.getOrderList()  
    },
    // 分页显示方式二：点击加载按钮加载
    // 分页显示方式三：滚动加载(vue-infinite-scroll)
    scrollMore(){
      this.busy=true; //触发事件一开始禁用滚动
      setTimeout(()=>{ //防抖
        this.pageNum++;
        this.getList()
      },500)
    },
    // 单独定义加载数据方法供scrollMore调用
    getList(){
      this.loading=true; 
      this.axios.get('/orders',{
        params:{
          pageSize:10,
          pageNum:this.pageNum
        }
      }).then(res=>{
        this.orderList=this.orderList.concat(this.orderList);
        this.loading=false;
        // 判断是否有下一页，如没有就禁用滚动加载
        if(res.hasNextPage){//此接口提供了是否有下页的参数
          this.busy=false;
        }else{
          this.busy=true;
        }
      })
    }
  },
  mounted(){
    this.getOrderList();
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/config.scss';

.order-list{
  .wrapper{
    background:$colorJ;
    padding:33px 0 110px;
    .order-box{
      .order{
        border:1px solid $colorJ;
        background:$colorG;
        margin-bottom:20px;
        &:last-child{
          margin-bottom: 0;
        }
        .order-title{
          @include height(74px);
          background:$colorK;
          padding:0 43px;
          font-size: 16px;
          color:$colorC;
          .item-info{
            span{
              margin:0 9px;
            }
          }
          .money{
            font-size: 26px;
            color:$colorB;
          }
        }
        .order-content{
          padding:0 43px;
          .good-box{
            width:88%;
            .good-list{
              display:flex;
              align-items:center;
              height:110px;
              border-bottom:1px solid #eee;
              .good-img{
                width:70px;
                img{
                  width:100%;
                }
              }
              .good-name{
                font-size: 18px;
                color:$colorB;
              }
            }
          }
          .good-state{
            @include height(145px);
            font-size: 20px;
            color:$colorA;
            a{
              color:$colorA;
            }
          }
        }
      }
      .pagination{
        text-align: right;
      }
      .scroll-more{
        text-align: center;
        img{
          width:80px;
        }
      }
    }
  }
}
</style>