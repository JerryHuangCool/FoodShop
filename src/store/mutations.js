import {SET_HEADER} from './mutation-types'


export default{
    [SET_HEADER](state,data){
        state.h_title = data.title;
        state.h_log_show = data.logShow;
        state.h_search_show = data.searchShow;
    }
};