import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
    reqAddress,
    reqFoodTypes,
    reqShopList,
    reqUserInfo,
    reqLogout,
    reqShopRatings,
    reqShopGoods,
    reqShopInfo,
    reqSearchShop
} from '../api'


export default {
    async getAddress({commit,state}) {
        const geohash = state.latitude+',' + state.longitude;
        const res = await reqAddress(geohash);
        if (res.code === 0) {
            const address = res.data
            commit(RECEIVE_ADDRESS, { address });
        }
    },

    async getFoodTypes({commit}) {
        const res = await reqFoodTypes();
        if(res.code === 0) {
            const categorys = res.data;
            commit(RECEIVE_CATEGORYS,{categorys});
        }
    },

    async getShopList({commit,state}) {
        const latitude = state.latitude;
        const longitude = state.longitude;
        const res = await reqShopList(latitude,longitude);
        if(res.code === 0) {
            const shopList = res.data;
            commit(RECEIVE_SHOPS,{shopList});
        }

    }
};