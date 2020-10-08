// 环境管理（注：使用jsonp或CORS跨域时需要配置不同环境下的baseURL，若使用代理就不需要）
let baseURL;
switch (process.env.NODE_ENV) { //使用process.env.NODE_ENV取出环境变量信息
  // 不同环境使用相应的URL
  case 'development':
    baseURL='http://dev-mall-pre.springboot.cn/api'
    break;
  case 'test':
    baseURL='http://test-mall-pre.springboot.cn/api'
    break;
  case 'prod':
    baseURL='http://mall-pre.springboot.cn/api'
    break;
  default:
    baseURL='http://mall-pre.springboot.cn/api'
    break;
}
// 判断当前环境变量env  (利用webpack的--mode参数使环境变量传过来，package.json中scripts.serve)


export default {
  baseURL
}