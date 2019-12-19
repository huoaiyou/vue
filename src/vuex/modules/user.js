import {
  SAVE_TOKEN,
  SAVE_USER,
  RESET_USER,
  RESET_TOKEN,
} from '../mutation-types'

import {
  reqAutoLogin,
} from '@/api'

export default {
  state:{
    user: {},
    token: localStorage.getItem('token_key') || '',
  },
  mutations:{
    [SAVE_TOKEN](state,{token}){
      state.token = token
    },
    [SAVE_USER](state,{user}){
      state.user = user
    },
    [RESET_TOKEN] (state) {
      state.token = ''
    },
    [RESET_USER] (state) {
      state.user = {}
    },
  },
  actions:{
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
  },
  getters:{}
}