<template id="app">
  <router-view></router-view>
  <FootGuide v-if="route.meta.showFooter"></FootGuide>
  
</template>

<script>
import { useRoute } from "vue-router";//vue3取消了this，可以用setup的参数context获取$的一些对象($route等)
import { useStore } from "vuex";
import { onMounted } from "vue";
import { useAction } from "./hooks/useAction";
//但是更推荐引入函数在setup里使用
import FootGuide from './components/FootGuide.vue';


export default {
  name: 'App',
  components: {
    FootGuide,
    
},

setup() {
  const route = useRoute();
  const stateAction = useAction(['getUserInfo']);
  const getUserInfo = stateAction.getUserInfo;
  onMounted(()=>{
    getUserInfo();
  });
  return {
    route,
  };
  
}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
  position relative
</style>
