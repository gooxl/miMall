<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" alt="">
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
            <span class="sep-line">|</span>
            <span >扫码登录</span>
          </h3>
          <div class="input" >
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input" >
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" >手机短信登录 | 注册</div>
            <div class="reg" @click="register">立即注册<span> | </span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://www.imooc.com/u/1343480" target="_blank">简体</a><span>|</span>
        <a href="https://www.imooc.com/u/1343480" target="_blank">繁体</a><span>|</span>
        <a href="https://coding.imooc.com/class/113.html" target="_blank">English</a><span>|</span>
        <a href="https://coding.imooc.com/class/236.html" target="_blank">FAQ</a><span>|</span>
        <a href="https://coding.imooc.com/class/343.html" target="_blank">Privacy Policy</a>
      </div>
      <p class="copyright">Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>

export default {
  name:'login',
  data(){
    return{
      username:'',
      password:'',
      userId:'',
    }
  },
  methods:{
    login(){
      //所有属性都挂载在vue实例对象中，可直接解构使用
      let {username,password}= this
      this.axios.post('/user/login',{
        username,
        password
      }).then(res=>{
        //使用vue-cookie将userId保存到cookie，有效期
        this.$cookie.set('userId',res.id,{expires:'Session'})
        //通过dispatch派发vuex中定义的方法
        this.$store.dispatch('saveUserName',res.username) //将请求得来的username传入vuex
        this.$router.push({
          name:'index',
          params:{
            from:'login'
          }
        })
      })
    },

    register(){
      this.axios.post('/user/register',{
        username:'gu',
        password:'123',
        email:'gu@qq.com'
      }).then(res=>{
        this.$message.success('注册成功');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  .container{
    height:113px;
    img{
      width:auto;
      height: 100%;
    }
  }
  .wrapper{
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container{
      height:576px;
      .login-form{
        box-sizing:border-box;
        padding:0 31px;
        width:410px;
        height: 510px;
        position: absolute;
        right:0;
        top:29px;
        background:#fff;
        h3{
          font-size: 23px;
          line-height: 24px;
          text-align: center;
          margin:40px auto ;
          .checked{
            color:#ff6600;
          }
          .sep-line{
            margin:0 32px;
          }
        }
        .input{
          display: inline-block;
          width:348px;
          height: 50px;
          border:1px solid #e5e5e5;
          margin-bottom:20px;
          input{
            border:none;
            height:100%;
            width:100%;
            padding-left:18px;
          }
        }
        .btn-box{
          .btn{
            width:100%;
            line-height: 50px;
            font-size: 16px;
            margin-top:10px
          }
        }
        .tips{
          margin-top:10px;
          font-size: 14px;
          display: flex;
          justify-content:space-between;
          .sms{
            color:#ff6600;
          }
          .reg{
            color:#999;
          }
        }
      }
    }
  }
  .footer{
    height:100px;
    padding-top: 60px;
    color:#999;
    font-size:16px;
    text-align: center;
    .footer-link{
      a{
        display: inline-block;
        color:#999;
      }
      span{
        margin:0 10px;
      }
    }
    .copyright{
      margin-top:13px;
    }
  }
}
</style>