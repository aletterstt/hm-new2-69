import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入公共样式
import './styles/base.less'
import './styles/iconfont.css'

/* import Vant from 'vant'

Vue.use(Vant) */
//按需引入
import { Field,Toast,Cell, CellGroup,Dialog,Radio,RadioGroup,Uploader,List } from 'vant'
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Uploader);
Vue.use(List);
import axios from 'axios'
Vue.prototype.$axios=axios
axios.defaults.baseURL="http://localhost:3000"
Vue.use(Toast)
//引入 自动适配所有屏幕
import 'lib-flexible'
Vue.config.productionTip = false

//引入moment
import moment from 'moment'
Vue.filter('date',function(val,format="YYYY-MM-DD"){
  return moment(val).format(format)
})

//请求拦截器
//拦截所有的axios请求
//axios.get(url,config)
axios.interceptors.request.use(config=>{
  const token=localStorage.getItem('token')
  if(token){
    config.headers.Authorization=token
  }
 
  return config
})
//响应拦截器

axios.interceptors.response.use(res=>{
  const {statusCode,message}=res.data
  if(statusCode===401 && message=="用户信息验证失败"){
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    router.push('/login')
  }
  return res
})
//引入子组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'
//注册全局组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
