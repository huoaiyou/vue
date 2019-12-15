import {
  reqAddress,
  reqCategorys,
  reqShops  
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
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
}