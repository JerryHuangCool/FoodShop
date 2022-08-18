import {createRouter,createWebHistory} from "vue-router";

//引入路由组件
/* import MSite from '../pages/MSite';
import Order from '../pages/Order';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import Login from '../pages/Login'; */
//通过箭头函数实现路由懒加载，import返回的是promise对象，可以减小打包的大小

const routes = [
    {
        path: '/',
        component: () => import('../pages/MSite'),
        meta: {
            showTop:true,
            showFooter:true
        }
    },

    {
        path:'/search',
        component: () => import('../pages/Search'),
        meta: {
            showTop:true,
            showFooter:true
        }
    },

    {
        path:'/order',
        component: () => import('../pages/Order'),
        meta: {
            showTop:true,
            showFooter:true
        }
    },

    {
        path:'/profile',
        component: () => import('../pages/Profile'),
        meta: {
            showTop:true,
            showFooter:true
        }
    },
    {
        path:'/login',
        component: () => import('../pages/Login'),
        meta: {
            showTop:false,
            showFooter:false
        }
    }

];
//创建并暴露一个路由
export default createRouter({
    history: createWebHistory(),
    routes,
});
