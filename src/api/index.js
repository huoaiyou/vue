import ajax from './ajax.js'

//根据经纬度获取位置详情
export const reqAddress = (longitude,latitude) => ajax(`/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqCategorys = () => ajax('/index_category',{needCheck:true})

//根据经纬度获取商铺列表
export const reqShops = ({longitude,latitude}) => ajax('/shops',{params:{latitude,longitude},needCheck:true})

//发送短信验证码
export const reqSendCode = phone => ajax.get('/sendcode',{params:{phone}})

// 发送短信登录请求
export const reqSmsLogin = (phone,code) => ajax.post('/login_sms',{phone,code})

// 发送密码登录请求
export const reqPwdLogin = ({name,pwd,captcha}) => ajax.post('/login_pwd',{name,pwd,captcha})

// 自动登录
export const reqAutoLogin = () => ajax.get('/auto_login')

//mock商品列表
export const reqGoods = () => ajax('/goods')

//mock评论
export const reqRatings = () => ajax('/ratings')

//mock商家
export const reqInfo = () => ajax('/info')










