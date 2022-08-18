<template>
  <!--首页附近商家-->
  <div class="shop_container">
    <ul class="shop_list">
      <ShopItem v-for="(state,index) in shopStates" :key="index" :shopState="state"></ShopItem>  
      
    </ul>
  </div>
</template>

<script>
import ShopItem from './ShopItem.vue';
export default {
    name: "ShopList",
    setup() {
        let shopStates = [
            { title: "汉堡王", rating: "3.6", order: 106, o_price: 45, d_price: 3 ,picture:require("../assets/images/shop/1.jpg")},
            { title: "肯德基", rating: "4.2", order: 1660, o_price: 40, d_price: 4,picture:require("../assets/images/shop/2.jpg") },
            { title: "华莱士", rating: "2.1", order: 85, o_price: 25, d_price: 5,picture:require("../assets/images/shop/3.jpg") },
            { title: "兰州牛肉面", rating: "4.9", order: 786, o_price: 15, d_price: 2,picture:require("../assets/images/shop/4.jpg") },
            { title: "海底捞", rating: "3.7", order: 35, o_price: 150, d_price: 15,picture:require("../assets/images/shop/1.jpg") },
        ];
        return {
            shopStates,
        };
    },
    components: { ShopItem }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/shoplist.styl">

</style>