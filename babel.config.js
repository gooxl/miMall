module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', //preset为之前所有发布的语法规则的所有组合
  ],
  "plugins": [ //配置plugins即可现实按需加载
    [
      "component",
      {
        "libraryName": "element-ui",  //指定插件名
        "styleLibraryName": "theme-chalk" //指定样式
      }
    ]
  ]
}
