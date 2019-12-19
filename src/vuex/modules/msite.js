
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  
} from '../mutation-types'

import {
  reqAddress,
  reqCategorys,
  reqShops, 
  
} from '@/api'

export default{
  state:{
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组
  },
  mutations:{
    [RECEIVE_ADDRESS](state,address){
      state.address = address
    },
    [RECEIVE_CATEGORYS](state,categorys){
      state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,shops){
      state.shops = shops
    },
  },
  actions:{
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
  },
  getters:{}
}