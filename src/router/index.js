import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const Login = () => import('views/login/Login.vue')
const Home = () => import('views/home/Home.vue')
const Rights = () => import('views/rights/Rights.vue')
const Roles = () => import('views/roles/Roles.vue')
const Users = () => import('views/users/Users.vue')
  const routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    redirect:'/users',
    children:[
      {
        path:'/rights',
        component:Rights
      },
      {
        path:'/roles',
        component:Roles
      },
      {
        path:'/users',
        component:Users
      }
    ]
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
