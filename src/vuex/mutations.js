import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  SAVE_TOKEN,
  SAVE_USER,
  RESET_USER,
  RESET_TOKEN,
  RECERVE_GOODS,
  RECERVE_RATINGS,
  RECERVE_INFO,
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state,address){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,categorys){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,shops){
    state.shops = shops
  },
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
  [RECERVE_GOODS](state,{goods}){
    state.goods = goods
  },
  [RECERVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [RECERVE_INFO](state,{info}){
    state.info = info
  }
}