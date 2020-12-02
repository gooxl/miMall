<template>
  <!-- 公用模态框 -->
  <transition name="slide">
    <div class="modal" v-show="showModal">
    <!-- 遮罩层 -->
    <div class="mask"></div>
    <!-- 弹框 -->
    <div class="modal-dialog">
      <div class="modal-header">
        <span>{{title}}</span>
        <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <a href="javascript:;" class="btn" v-if="btnType==1" @click="$emit('submit')">{{sureText}}</a>
        <a href="javascript:;" class="btn" v-else-if="btnType==2" @click="$emit('cancel')">{{cancelText}}</a>
        <div class="btn-group" v-else>
          <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
          <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
        </div>
      </div>
    </div>
    </div>
  </transition>

</template>

<script>

export default {
  name:'modal',
  props:{ //创建类型属性
    modalType:{ //弹框类型：大large，中middle，小small，表单form
      type:String,
      default:'form'
    },
    title:String,  //弹框标题
    btnType:String, //按钮类型：1:确定,2:取消,3:确定+取消
    sureText:{
      type:String,
      defalut:'确定'
    },
    cancelText:{
      type:String,
      defalut:'取消'
    },
    showModal:Boolean, //是否显示
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/modal.scss';

</style>