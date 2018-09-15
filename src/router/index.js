import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login:()=> import('@/views/login/login')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component:components.login
    }
  ]
})
