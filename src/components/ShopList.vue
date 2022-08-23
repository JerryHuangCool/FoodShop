<template>
  <!--首页附近商家-->
  <div class="shop_container">
    <ul class="shop_list" v-if="shops.length">
      <ShopItem
        v-for="(state, index) in shops"
        :key="index"
        :shopState="state"
        @click="router.push('/shop')"
      ></ShopItem>
    </ul>
    <ul v-else>
      <li v-for="item in 6" :key="item">
        <img src="./img/shop_back.svg" alt="back" />
      </li>
    </ul>
  </div>
</template>

<script>
import ShopItem from "./ShopItem.vue";
import { useState } from "../hooks/useState";
import { useRouter } from "vue-router";
export default {
  name: "ShopList",
  setup() {
    const storeState = useState(["shops"]);
    const router = useRouter();
    return {
      ...storeState,
      router
    };
  },
  components: { ShopItem },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/shoplist.styl"></style>