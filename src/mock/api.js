import Mock from 'mockjs'

Mock.mock('/api/user/login',{//baseURL中设置了'/api'所以前面加/api
  "status":0,
  "data":{
    // 更多语法，看mock.js官网
    "id | 1-10":0, //例：由0开始生成1-10的随机数
    "username":"@cname", //例：生成随机中文名字，英文名去掉c 
    "email":"gu@qq.com",
    "phone":null,
    "role":0,
    "createTime":1480600000000,
    "updateTime":1486000000000,
  }
})