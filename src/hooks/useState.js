import { Object } from 'core-js';
import {computed} from 'vue';
import { useStore,mapState } from "vuex";


export function useState(mapper) {
    const store = useStore();
    const storeStateFns = mapState(mapper);
    const storeState = {};

    Object.keys(storeStateFns).forEach((fnKey)=>{
        const fn = storeStateFns[fnKey].bind({$store:store});
        storeState[fnKey] = computed(fn);
    });
    
    return storeState;
}