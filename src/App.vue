<template id="app">
  <HeaderTop v-if="route.meta.showTop"></HeaderTop>
  <router-view></router-view>
  <FootGuide v-if="route.meta.showFooter"></FootGuide>
  
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";//vue3取消了this，可以用setup的参数context获取$的一些对象($route等)
import { reqAddress } from "./api/index";
//但是更推荐引入函数在setup里使用
import FootGuide from './components/FootGuide.vue';
import HeaderTop from './components/HeaderTop.vue';


export default {
  name: 'App',
  components: {
    FootGuide,
    HeaderTop
},

setup() {
  const route = useRoute();
  const address = reqAddress('40.10038,116.36867');
  onMounted(() => {
    console.log(address);
  });
  return {
    route,
    address
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
