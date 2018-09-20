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
  bookdetails:() => import('@/views/books/bookdetails'),
  addbook:() => import('@/views/books/addbook'),
  slideshow:() => import('@/views/slideshow/index'),
  addslideshow:() => import('@/views/slideshow/addslideshow'),
  det_slideshow:() => import('@/views/slideshow/det_slideshow'),
}

const router = new Router({
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
          meta:{title:'修改个人信息'},
          component:components.edituser,
        },{
          path:'editpassword',
          meta:{title:'修改密码'},
          component:components.editpassword
        },{
          path:'management',
          meta:{title:'分类列表'},
          component:components.management
        },{
          // path:'editclassify/:id',
          path:'editclassify',
          name:'editclassify',
          meta:{title:'修改列表'},
          component:components.editclassify
        },{
          path:'addclassify',
          name:'addclassify',
          meta:{title:'添加列表'},
          component:components.addclassify
        },{
          // path:'editclassify/:id',
          path:'classify_book',
          name:'classify_book',
          meta:{title:'分类图书详情'},
          component:components.classify_book
        },{
          path:'book',
          name:'book',
          meta:{title:'图书列表'},
          component:components.books
        },{
          path:"bookdetails/:bookid",
          name:"bookdetails",
          meta:{title:'书籍详情'},
          component:components.bookdetails
        },{
          path:'addbook',
          meta:{title:'添加图书'},
          component:components.addbook
        },{
          path:'slideshow',
          name:'slideshow',
          meta:{title:'轮播图列表'},
          component:components.slideshow
        },{
          path:'addslideshow',
          name:'addslideshow',
          meta:{title:'添加轮播图'},
          component:components.addslideshow
        },{
          path:'det_slideshow',
          name:'det_slideshow',
          meta:{title:'轮播图详情'},
          component:components.addslideshow
        },{
          path:'addtypebook',
          name:'addtypebook',
          meta:{title:'轮播图详情'},
          component:components.books
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
}) 

export default router