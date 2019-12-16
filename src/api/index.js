import ajax from './ajax.js'
//根据经纬度获取位置详情
export const reqAddress = (longitude,latitude) => ajax(`/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqCategorys = () => ajax('/index_category')

//根据经纬度获取商铺列表
export const reqShops = ({longitude,latitude}) => ajax('/shops',{params:{latitude,longitude}})

//发送短信验证码

