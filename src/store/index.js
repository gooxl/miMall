import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:'',
    cartCount:0
  },
  mutations: { //修改共享数据
    saveUserName(state,username){
      state.username=username
    },
    saveCartCount(state,count){
      state.cartCount=count;
    },
  },
  actions: {
   //通过commit调用mutations修改共享数据的方法
    saveUserName(context,username){ 
      context.commit('saveUserName',username)
    },
    saveCartCount(context,count){
      context.commit('saveCartCount',count)
    },
  },
  modules: {
  }
})
