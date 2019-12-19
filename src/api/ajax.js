import axios from 'axios'
import qs from 'qs'
import {Indicator,Toast,MessageBox} from 'mint-ui'

import store from '@/vuex/store'
import router from '@/router'

const instance = axios.create({
  baseURL: '/api',
  timeout: 20000
})
//请求拦截器
instance.interceptors.request.use((config)=>{

  Indicator.open()

  const data = config.data
  if(data instanceof Object){
    config.data = qs.stringify(data)
  }

  const token = store.state.user.token

  if(token){
    config.headers['Authorization'] = token
  }else{
    const needCheck = config.headers.needCheck
    if(needCheck){
      throw new Error('没有登录,请重新登录')
    }
  }
  return config
})
//响应拦截器
instance.interceptors.response.use(
  response => {
    Indicator.close()
    return response.data
  },
  error =>{
    Indicator.close()
    const response = error.response
    console.log(response)
    if(!response){
      const path = router.currentRoute.path
      if(path!=='/login'){
        router.replace('/login')
        Toast(error.message)
      }
    }else{
      if(error.response.status === 401){
        const path = router.currentRoute.path
        if(path!=='/login'){
          store.dispatch('logout')
          router.replace('/login')
          Toast(response.data.message || '登录失效,请重新登录')
        }
      }else if(response.status === 404){
        MessageBox('提示','请求资源不存在')
      }else{
        MessageBox('提示','请求出错'+error.message)
      }
    }
    return new Promise(()=>{})
  }
)
export default instance