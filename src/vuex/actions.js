import {
  reqAddress,
  reqCategorys,
  reqShops, 
  reqAutoLogin 
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  SAVE_USER,
  SAVE_TOKEN,
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
    commit(SAVE_USER)
    commit(SAVE_TOKEN)
  }
}