import { Object } from 'core-js';
import { useStore,mapActions } from "vuex";


export function useAction(mapper) {
    const store = useStore();
    const storeActionFns = mapActions(mapper);
    const storeAction = {};

    Object.keys(storeActionFns).forEach((fnKey)=>{
        const fn = storeActionFns[fnKey].bind({$store:store});
        console.log(fn);
        storeAction[fnKey] = fn;
    });
    
    return storeAction;
}