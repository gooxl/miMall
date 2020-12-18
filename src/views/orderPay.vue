<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请完成支付！</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分钟</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{payment}}</span>元</p>
              <p>订单详情
                <em class="icon-down" :class="{'up':showDetail}" @click="showDetail=!showDetail"
                ></em>
              </p>
            </div>
          </div>
          <div class="item-detail" v-show="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderId}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" alt=""/>
                  {{item.productName }}</li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked':payType==1}" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" :class="{'checked':payType==2}" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <!--自定义事件绑定传递给子组件的方法并传递图片 -->
    <scan-pay-code v-show="showWXPay" @close="closePayModal" :img="payImg" />
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @cancel="showPayModal=false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>是否确认完成支付？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import OrderHeader from "@/components/OrderHeader"
import ScanPayCode from '../components/ScanPayCode.vue'
import Modal from '../components/Modal.vue'
export default {
  name: 'order-pay',
  components:{
    OrderHeader,
    ScanPayCode,
    Modal,
  },
  data(){
    return{
      orderId:this.$route.query.orderNo,
      addressInfo:'', //收货人地址信息
      orderDetail:[], //订单详情，包含商品列表
      showDetail:false,//显示订单详情
      payType:'', //支付类型
      showWXPay:false, //显示微信支付
      payImg:'', //微信支付的二维码地址
      showPayModal:false, //是否显示二次支付确认弹框
      payment:0,  //支付总额
      Timer:''  //支付状态轮询定时器
    }
  },
  methods:{
    getOrderDetail(){
      this.axios.get(`/orders/${this.orderId}`,{}).then(res=>{
        let item=res.shippingVo; //收货人信息
        this.addressInfo=`${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`
        this.orderDetail=res.orderItemVoList;
        this.payment=res.payment;
      })
    },
    paySubmit(payType){ //payType 1：支付宝支付; 2：微信支付
      if(payType==1){
        // 使用window.open打开新窗口跳转
        window.open('/#/order/alipay?orderId='+this.orderId,'_blank')
      }else{  //微信支付
        this.axios.post('/pay',{
        orderId:this.orderId,
        orderName:'gu商城商品', //扫码支付时订单名称
        amount:0.01, //单位元
        payType:2, //1支付宝，2微信
        }).then(res=>{
          QRCode.toDataURL(res.content) //将接口返回的字符串转换为URL地址
          .then(url => { //QRCode会将地址转换为一个Bast64的图片
            this.showWXPay=true  //显示微信支付弹框
            this.payImg=url; //保存图片传递给微信支付子组件渲染
            this.loopOrderState(); //当二维码弹框弹出，启动轮询定时器，检查订单支付状态
          })
          .catch(err => {
            this.$message.error(err)
          })
        })
      }
    },
    // 关闭微信支付弹框
    closePayModal(){
      this.showWXPay=false    //关闭微信支付弹框
      this.showPayModal=true  //显示二次确认支付弹框
      clearInterval(this.Timer)  //清除轮询定时器
    },
    // 轮询当前订单支付状态
    //接口订单状态:0-已取消-10-未付款，20-已付款，40-已发货，50-交易成功，60-交易关闭
    loopOrderState(){
    // 轮询2种方式:1.定时器;2.webscoket搭建服务器，支付完成会向前端发送完成支付的消息
      this.Timer=setInterval(()=>{
        this.axios.get('/orders/'+this.orderId).then(res=>{
          if(res.status==20){//20表示已付款
            clearInterval(this.Timer)//清除轮询定时器
            this.goOrderList();
          }
        })
      },1000); //计时需要按公司带宽压力来调
    },
    goOrderList(){
      this.$router.push('/order/list')
    }
  },
  mounted(){
    this.getOrderDetail()
  }
}
</script>
<style lang="scss">
.order-pay{
  .wrapper{
    background:#f5f5f5;
    padding:30px 0 60px;
    .order-wrap{
      padding:62px 50px;
      background:#fff;
      font-size: 14px;
      margin-bottom:30px;
      .item-order{
        display:flex;
        align-items:center;
        .icon-succ{
          width:90px;
          height:90px;
          border-radius: 50%;
          background:url('/imgs/icon-gou.png')#80c58a no-repeat center;
          margin-right:40px;
        }
        .order-info{
          margin-right:248px;
          h2{
            font-size: 24px;
            color:#333;
            margin-bottom:20px;
          }
          p{
            color:#666;
            span{
              color:#ff6600;
            }
          }
        }
        .order-total{
          font-weight:bold;
          font-size: 16px;
          &>:first-child{
            margin-bottom:30px;
          }
          span{
            font-size: 28px;
            color:#ff6600;
          }
          .icon-down{
            display:inline-block;
            width:16px;
            height:13px;
            background:url('/imgs/icon-down.png')no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition:all .3s;
            cursor: pointer;
            &.up{
              transform: rotate(180deg);
            }
          }
          .icon-up{
            transform: rotate(180deg);
          }
        }
      }
      .item-detail{
        border-top: 1px solid #d7d7d7;
        margin-top:45px;
        padding:47px 130px;
        font-size: 14px;
        .item{
          margin-bottom:19px;
          .detail-title{
            float:left;
            width:100px;
          }
          .detail-info{
            display:inline-block;
            img{
              width:30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay{
      padding:26px 50px 72px;
      background-color:#fff;
      color:#333;
      h3{
        font-size: 20px;
        font-weight: 200;
        color:#333;
        padding-bottom:24px;
        border-bottom:1px solid #d7d7d7;
        margin-bottom:26px;
      }
      .pay-way{
        font-size:18px;
        .pay{
          display:inline-block;
          width:188px;
          height:64px;
          border:1px solid #d7d7d7;
          cursor: pointer;
          &:last-child{
            margin-left:20px;
          }
          &.checked{
            border:1px solid #ff6600;
          }
        }
        .pay-ali{
          background:url('/imgs/pay/icon-ali.png')no-repeat center;
          background-size: 103px 38px;
          margin-top:19px;
        }
        .pay-wechat{
          background:url('/imgs/pay/icon-wechat.png')no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}

</style>