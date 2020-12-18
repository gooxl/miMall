// 封装Session-Storage
/*为什么：
- storage本身有API，但只是简单的key/value形式
- storage只存储字符串，需要人工转换成json对象 
- storage只能一次性清空，不能单个清空  */
const STORAGE_KEY="mall";
export default{
  /*存储值*/
  setItem(key,value,module_name){//key为属性，value为属性值,module_name为当前对象下的某个模块 
    //存储单个值，如果有模块名，将值保存到模块中
    if(module_name){ 
      let val=this.getItem(module_name)
      val[key]=value;
      this.setItem(module_name,val)
    }else{ 
      //否则，存储整个对象
      let val=this.getStorage(); 
      val[key]=value;  
      window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
    }
  },
  /* 获取某个模块下的属性，如:user下的userName*/
  getItem(key,module_name){//key为属性，modult_name为当前对象下的某个模块 
    // 如果有模块就获取当前模块名并返回
    if(module_name){
      let val=this.getItem(module_name)
      if(val) return val[key]
    }
    //否则返回整个storage的某个数据
    return this.getStorage()[key] 
  },
  // 获取整个storage
  getStorage(){
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
  },
  /*清除某个值*/
  clear(key,module_name){ //key为属性，modult_name为当前对象下的某个模块
    let val=this.getStorage();
    //如果有模块名，清除模块下的值
    if(module_name){
      if(!val[module_name]) return ;
      delete val[module_name][key]
    }else{
      //如果没有模块，直接删除这个属性
      delete val[key];
    }
    //再将所有修改写入sessionStorage中
    window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val)); 
  },
}