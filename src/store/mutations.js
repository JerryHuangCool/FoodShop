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
    
    [RECEIVE_ADDRESS](state,{address}){
        state.address = address
    },

    [RECEIVE_CATEGORYS](state,{categorys}){
        state.categorys = categorys;
    },

    [RECEIVE_SHOPS](state,{shopList}){
        state.shops = shopList;
    },
};