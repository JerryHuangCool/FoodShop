import { Object } from 'core-js';
import {computed} from 'vue';
import { useStore,mapGetters } from "vuex";


export function useGetter(mapper) {
    const store = useStore();
    const storeGettersFns = mapGetters(mapper);
    const storeGetters = {};

    Object.keys(storeGettersFns).forEach((fnKey)=>{
        const fn = storeGettersFns[fnKey].bind({$store:store});
        storeGetters[fnKey] = computed(fn);
    });
    
    return storeGetters;
}