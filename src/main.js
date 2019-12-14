import Vue from 'vue'


import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
import Header from './components/Header/Header.vue'
import store from './vuex/store.js'

Vue.config.productionTip = false
Vue.component("Header",Header)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
