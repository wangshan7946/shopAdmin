import Vue from 'vue'
import Router from 'vue-router'
// webpack --提供了@符号代表src
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'home',
      path: '/',
      component:Home,
      // 用户组件出现在home主体部分，需要在home基础之上
      children:[
        {
          name:'users',
          path: '/users',
          component:Users
        }
      ]
    },
    {
      name:'login',
      path: '/login',
      component:Login
    },
    
  ]
})
