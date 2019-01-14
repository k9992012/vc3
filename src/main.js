import '../node_modules/element-ui/lib/theme-chalk/index.css'
import 'viewerjs/dist/viewer.css'
import '../src/assets/css/reset.css'
import Vue from 'vue'
import router from './router'
import store from './store'
import ELEMENT from 'element-ui'
import axios from 'axios'
import Viewer from 'v-viewer'
import VueAxios from 'vue-axios'
import App from './App.vue'
import filters from './assets/js/filters'

Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(Viewer)
Vue.use(VueAxios, axios)
Vue.use(ELEMENT)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
