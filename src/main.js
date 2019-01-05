// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 导入ui库
import ElementUI from 'element-ui'
//单独引入css文件
import "element-ui/lib/theme-chalk/index.css"
//引入自己的css
import '@/assets/index.css'
//导入自己写的插件-axios
import http from "./pligins/http"
import App from './App'
import router from './router'
import moment from 'moment'


// 全局写在main.js处理日期格式的过滤器
Vue.filter("fmdata",(v)=>{
  //返回处理的结果
  return moment(v).format('YYYY-MM-DD hh:mm:ss')
})

Vue.config.productionTip = false
// 使用ui插件
Vue.use(ElementUI)
//使用axios插件
Vue.use(http)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
