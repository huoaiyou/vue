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
    const {longitude,latitude} = state
    const result = await reqAddress(latitude,longitude)
    if(result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS,address)
    }
  }
}