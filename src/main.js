import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false

// import {request} from 'network/request'

// request({
//   url:'login',
//   method:'post',
//   data:{
//     username:'admin',
//     password:'123456'
//   }
// }).then(data => console.log(data))  

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
