import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import env from './env'

//baseURL根据跨域方式调整，如不使用代理，写完整地址"http://..."
axios.defaults.baseURL="/api";
axios.defaults.timeout=8000;

// 根据环境变量获取不同的请示地址
axios.defaults.baseURL=env.baseURL;

/*axios拦截器 */
//接口错误拦截
axios.interceptors.response.use(function(response){ 
  // 所有返回值都会经过response，responst.data才是返回值内容
  let res=response.data;
  // 状态码按公司规范
  if(res.status==0){ //如果状态码为0代表成功，返回返回值
    return res.data  
  }else if(res.status==10){ //如10为未登录，跳转至登录页
    window.location.href='/#/login' //不能使用路由跳转，因为main.js不在App.vue中，this不指向Vue。hash路由带上#
  }else{ //否则报错，将错误信息弹出
    alert(res.msg)
  }
})

Vue.use(VueAxios,axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
