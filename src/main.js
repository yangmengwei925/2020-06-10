import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'

import * as filters from './filters/index'
Vue.use(ElementUI);

Vue.config.productionTip = false

//全局过滤器
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
