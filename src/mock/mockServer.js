/* 
使用mockjs模拟服务器，拦截ajax请求
*/
import Mock from 'mockjs';
import data from './data.json';


//goods接口
Mock.mock('/goods', { code: 0, data: data.goods });
//rating 接口
Mock.mock('/ratings', { code: 0, data: data.ratings });
//info 接口
Mock.mock('/info', { code: 0, data: data.info });

