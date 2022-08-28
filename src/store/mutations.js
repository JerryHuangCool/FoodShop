import {
    SET_HEADER,
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'


export default {
    [SET_HEADER](state, data) {
        state.h_title = data.title;
        state.h_log_show = data.logShow;
        state.h_search_show = data.searchShow;
    },

    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },

    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys;
    },

    [RECEIVE_SHOPS](state, { shopList }) {
        state.shops = shopList;
    },
    [RECEIVE_USER_INFO](state, { userinfo }) {
        state.userInfo = userinfo;
    },
    [RESET_USER_INFO](state) {
        state.userInfo = {};
    },
    [RECEIVE_INFO](state, { info }) {
        state.info = info;
    },
    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings;
    },
    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods;
    },
    [INCREMENT_FOOD_COUNT](state, { food }) {
        if (!food.count) {
            food.count = 1;//对于对象，vue2实现新增属性响应式需要set方法，而vue3可直接添加属性
            state.cartFoods.push(food);//添加的是food的引用
        } else {
            food.count++;
        }
    },
    [DECREMENT_FOOD_COUNT](state, { food }) {

        if (food.count) {//避免出现负数
            food.count--;
            if (food.count === 0) {
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1);
            }
        }

    },
    [CLEAR_CART](state) {
        state.cartFoods.forEach((food) => {
            food.count = 0;
        });
        state.cartFoods = [];
    },
    [RECEIVE_SEARCH_SHOPS](state,{searchShops}) {
        state.searchShops = searchShops;
    }

};