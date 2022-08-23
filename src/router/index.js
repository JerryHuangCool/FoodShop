import {createRouter,createWebHistory} from "vue-router";

//引入路由组件
/* 
import MSite from '../pages/MSite';
import Order from '../pages/Order';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import Login from '../pages/Login'; */
//通过箭头函数实现路由懒加载，import返回的是promise对象，可以减小打包的大小

const routes = [
    {
        path: '/',
        redirect: '/msite',
    },
    {
        path: '/msite',
        component: () => import('../pages/MSite'),
        meta: {
            showFooter:true
        }
    },

    {
        path:'/search',
        component: () => import('../pages/Search'),
        meta: {
            showFooter:true
        }
    },

    {
        path:'/order',
        component: () => import('../pages/Order'),
        meta: {
            showFooter:true
        }
    },

    {
        path:'/profile',
        component: () => import('../pages/Profile'),
        meta: {
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
    },
    {
        path: '/shop',
        redirect: '/shop/goods',
        component: () => import('../pages/ShopView/Shop'),
        children: [
            {
                path: 'goods',
                component: () => import('../pages/ShopView/ShopGoods'),
            },
            {
                path: 'info',
                component: () => import('../pages/ShopView/ShopInfo'),
            },
            {
                path: 'rating',
                component: () => import('../pages/ShopView/ShopRating'),
            }
        ]
    }

];
//创建并暴露一个路由
export default createRouter({
    history: createWebHistory(),
    routes,
});
