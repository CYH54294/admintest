import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = () => import('views/login/Login.vue')
const Home = () => import('views/home/Home.vue')
  const routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/',
    redirect:'/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  //如果去的不是登录界面 就跳转到登录界面
    if(to.path !=='/login'){
      if(token){
        next()
      }else{
        next('/login')
      }
    }
    next()
  
})

export default router
