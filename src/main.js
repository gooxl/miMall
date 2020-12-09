import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import env from './env'
import App from './App.vue'


/*使用mock.js生成模拟数据*/
const mock=false; //mock开关
if(mock){
  /*注：此处希望mock为true时才把mock.js加载进来，
  要使用require(),不能使用import引入，
  如果使用import引入，你发送的请求将永远给mock.js拦截*/
  /*import是预编译加载，加载前就会加载引入的文件
  require引入的文件不会被预编译，当加载到require的时候才会执行*/
  require('@/mock/api')
}
//baseURL根据跨域方式调整，如不使用代理，写完整地址"http://..."
axios.defaults.baseURL="/api";
axios.defaults.timeout=80000;

// 根据环境变量获取不同的请示地址
// axios.defaults.baseURL=env.baseURL;

/*axios拦截器 */
//接口错误拦截
axios.interceptors.response.use(function(response){ 
  // 所有返回值都会经过response，responst.data才是返回值内容
  let res=response.data;
  let path=location.hash;
  // 状态码按公司规范
  if(res.status==0){ //如果状态码为0代表成功，返回返回值
    return res.data  
  }else if(res.status==10){ //如10为未登录，跳转至登录页
    //不能使用路由跳转，因为main.js不在App.vue中，this不指向Vue。hash路由带上#

    // window.location.href='/#/login' 
    return Promise.reject(res)  //通过promise抛出错误信息
  
  }else{ //否则报错，将错误信息弹出
    this.$message.warning(res.msg)
    return Promise.reject(res)  //通过promise抛出错误信息

  }
})

Vue.use(VueAxios,axios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad,{
  // 设定图片懒加载的loading效果图
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message=Message;
Vue.config.productionTip = false //设为true后有一些vue底层信息打印出来

// 价格过滤器
Vue.filter("price",function(val){
  if(!val) return '0.00';
  return '¥'+val.toFixed(2)+'元'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
