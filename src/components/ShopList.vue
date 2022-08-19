<template>
  <!--首页附近商家-->
  <div class="shop_container">
    <ul class="shop_list" v-if="shops.length">
      <ShopItem
        v-for="(state, index) in shops"
        :key="index"
        :shopState="state"
      ></ShopItem>
    </ul>
    <ul v-else>
      <li v-for="item in 6" :key="item">
        <img src="./shop_back.svg" alt="back" />
      </li>
    </ul>
  </div>
</template>

<script>
import ShopItem from "./ShopItem.vue";
import { useState } from "../hooks/useState";
export default {
  name: "ShopList",
  setup() {
    const storeState = useState(["shops"]);
    return {
      ...storeState,
    };
  },
  components: { ShopItem },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/shoplist.styl"></style>