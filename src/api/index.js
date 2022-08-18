/* 
接口请求模块
*/

import ajax from './ajax';

const BASE_URL = '/api';
//1、根据经纬度获取位置详情
export const reqAddress = (geohash) => {
    return ajax(`${BASE_URL}/position/${geohash}`);//params参数用模板字符串传，query参数传data
}
//2、获取食品分类列表
export const reqFoodTypes = () => {
    return ajax(BASE_URL+'/index_category');
}
//3、根据经纬度获取商铺列表
export const reqShopList= (latitude,longitude ) => {
    return ajax(BASE_URL+'/shops',{latitude,longitude});
 }
//4、根据经纬度和关键字搜索商铺列表
export const reqShopByKey = (keyword,geohash) => {
    return ajax(BASE_URL+'/search_shops',{keyword,geohash});
}
//5、获取一次性验证码
export const reqCaptcha = () => {
    return ajax(BASE_URL+'/captcha');
}
////6、用户名密码登陆
export const reqLoginPwd = () => {
    return ajax(BASE_URL+'/login_pwd','POST');
}
//7、发送短信验证码
export const reqSendCode = (phone) => {
    return ajax(BASE_URL+'/sendcode',{phone});
}
//8、手机号验证码登陆
export const reqLoginPhone = () => {
    return ajax(BASE_URL+'/login_sms','POST');
}
//9、根据会话获取用户信息
export const reqUserInfo = () => {
    return ajax(BASE_URL+'/userinfo');
} 
//10、用户登出 
export const reqLogOut = () => {
    return ajax(BASE_URL+'/logout');
} 