import Vue from 'vue'
import Router from 'vue-router'
// webpack --提供了@符号代表src
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'home',
      path: '/',
      component:Home
    },
    {
      name:'login',
      path: '/login',
      component:Login
    }
  ]
})
