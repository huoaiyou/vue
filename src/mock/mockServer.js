import Mock from 'mockjs'
import apiData from './data.json'

Mock.mock('/api/goods',{code:0,data:apiData.goods})
Mock.mock('/api/ratings',{code:0,data:apiData.ratings})
Mock.mock('/api/info',{code:0,data:apiData.info})

// console.log(apiData.goods)
// console.log(apiData.ratings)
// console.log(apiData.info)


