import Vue from 'vue'
import VueRouter from 'vue-router'

//引入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComment from '../views/MyComment.vue'

//全局前置守卫
//1.to:你要去哪里  305路由对象
//2.form 你从那里来 301 路由对象
//3. next 是否允许进入
//next () 允许进入
//next(false) 不允许进入
//next('/login') 允许进入 login


//注册
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: '/login',
      component: Login,
    },
    {
      path: '/register',
      name: '/register',
      component: Register,
    },
    {
      path: '/user',
      name: '/user',
      component: User,
    },
    {
      path: '/edit',
      name: '/edit',
      component: Edit,
    },
    {
      path: '/my-follow',
      name: '/my-follow',
      component: MyFollow,
    },
    {
      path: '/my-comment',
      name: '/my-comment',
      component: MyComment,
    },
  ],
})


router.beforeEach((to,from,next)=>{
  if(to.path==='/user'){
    let token=localStorage.getItem('token')
    if(token){
      next()
    }
    else{
      next('/login')
    }
  }else{
    next()
  }
})



export default router