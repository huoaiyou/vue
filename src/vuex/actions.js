import {
  reqAddress,
  reqCategorys,
  reqShops, 
  reqAutoLogin,
  reqGoods,
  reqRatings,
  reqInfo 
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  SAVE_USER,
  SAVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
  RECERVE_GOODS,
  RECERVE_RATINGS,
  RECERVE_INFO,
} from './mutation-types'

export default {
  async getAddress({commit,state}){
    // console.log(state)
    const {latitude,longitude} = state
    const result = await reqAddress(longitude,latitude)
    if(result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS,address)
    }
  },
  async getCategorys({commit}){
    const result = await reqCategorys()
    if(result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,categorys)
      // callback()
    }
  },
  async getShops({commit,state}){
    // console.log(state)
    const {latitude,longitude} = state
    const result = await reqShops({longitude,latitude})
    if(result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,shops)
    }
  },

  saveUser ({commit}, user){
    const token = user.token
    localStorage.setItem('token_key',token)
    delete user.token

    commit(SAVE_USER,{user})
    commit(SAVE_TOKEN,{token})
  },
  async autoLogin({commit,state}){
    if(state.token && !state.user._id){
      const result = await reqAutoLogin()
      if(result.code === 0){
        const user = result.data
        commit(SAVE_USER,{user})
      }
    }
  },
  logout ({commit}) {
    localStorage.removeItem('token_key')
    commit(RESET_USER)
    commit(RESET_TOKEN)
  },
  async getGoods({commit},cb){
    const result = await reqGoods()
    if(result.code === 0){
      const goods = result.data
      // console.log(result)

      commit(RECERVE_GOODS,{goods})
      typeof cb==='function' && cb()
    }
  },
  async getInfo({commit},cb){
    const result = await reqInfo()
    if(result.code === 0){
      const info = result.data
      commit(RECERVE_INFO,{info})
      typeof cb==='function' && cb()
    }
  },
  async getRatings({commit},cb){
    const result = await reqRatings()
    if(result.code === 0){
      const ratings = result.data
      commit(RECERVE_RATINGS,{ratings})
      typeof cb==='function' && cb()
    }
  }
}