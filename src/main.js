import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
import Header from './components/Header/Header.vue'
import Score from './components/Score/Score.vue'

import store from './vuex/store.js'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)

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

Vue.config.productionTip = false
Vue.component("Header",Header)
Vue.component("Score",Score)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')






