import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login:()=> import('@/views/login/login'),
  layout:() => import('@/views/layout/layout'),
  index:()=>import('@/views/index/index'),
  users:()=>import('@/views/users/index'),
  adduser:() => import('@/views/users/adduser'),
  edituser:() => import('@/views/users/edituser'),
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      name: 'login',
      component:components.login
    },
    {
      path:'/layout',
      name:'layout',
      component:components.layout,
      redirect:'/layout/index',
      meta:{
        title:'首页'
      },
      children:[
        {
          path:'index',
          component:components.index,
        },{
          path:'users',
          component:components.users,
          meta:{
            title:'管理员'
          },
        },{
          path:'adduser',meta:{
            title:'添加管理员'
          },
          component:components.adduser
        },{
          path:'edituser',
          component:components.edituser,
        },
      ]
    }
  ]
})
