
import Vue from 'vue'

import {
  
  RECERVE_GOODS,
  RECERVE_RATINGS,
  RECERVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT
} from '../mutation-types'

import {
  reqGoods,
  reqRatings,
  reqInfo 
} from '@/api'

export default {
  state:{ 
    goods:[],
    ratings:[],
    info:{}
  },
  mutations:{
    [RECERVE_GOODS](state,{goods}){
      state.goods = goods
    },
    [RECERVE_RATINGS](state,{ratings}){
      state.ratings = ratings
    },
    [RECERVE_INFO](state,{info}){
      state.info = info
    },
    [ADD_FOOD_COUNT](state,food){
      if(food.count){
        food.count++
        // console.log(food.count+"----")
      }else{
        Vue.set(food,'count',1)
      }
    },
    [REDUCE_FOOD_COUNT](state,food){
      if(food.count>0){
        food.count--
      }
    }
  },
  actions:{
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
    },
    updateFoodCount({commit},{isAdd,food}){
      if(isAdd){
        commit(ADD_FOOD_COUNT,food)
        // console.log('----')
      }else{
        commit(REDUCE_FOOD_COUNT,food)
      }
    }
  },
  getters:{}
}