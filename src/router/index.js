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
  editpassword:() => import('@/views/users/editpassword'),
  management:() => import('@/views/classify/management'),
  editclassify:() => import('@/views/classify/editclassify'),
  addclassify:() => import('@/views/classify/addclassify'),
  classify_book:() => import('@/views/classify/classify_book'),
  books:() => import('@/views/books/books'),
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
        },{
          path:'editpassword',
          component:components.editpassword
        },{
          path:'management',
          component:components.management
        },{
          // path:'editclassify/:id',
          path:'editclassify',
          name:'editclassify',
          component:components.editclassify
        },{
          path:'addclassify',
          name:'addclassify',
          component:components.addclassify
        },{
          // path:'editclassify/:id',
          path:'classify_book',
          name:'classify_book',
          component:components.classify_book
        },{
          path:'book',
          component:components.books
        }
      ]
    }
  ]
})
