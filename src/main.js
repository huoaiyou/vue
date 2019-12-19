import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
import Header from './components/Header/Header.vue'
import Score from './components/Score/Score.vue'
import CartControl from './components/CartControl/CartControl.vue'
import store from './vuex/store.js'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import i18n from './i18n'
import * as API from '@/api'
import './mock/mockServer.js'
import loading from '@/common/images/loading.gif'

Vue.config.productionTip = false
Vue.component("Header",Header)
Vue.component("Score",Score)
Vue.component("CartControl",CartControl)
Vue.prototype.$API = API
Vue.use(VeeValidate)
Vue.use(VueLazyload, {
  loading,
})

VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    myphone: '手机号',
    myscode: '验证码',
    users: '手机/邮箱/用户名',
    mypwd: '密码',
    mycode: '验证码',
  }
})

VeeValidate.Validator.extend('mobile', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})


new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')






