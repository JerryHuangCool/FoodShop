<template>
  <ShopHeader></ShopHeader>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/shop/goods">点餐</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/shop/rating">评价</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/shop/info">商家</router-link>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import ShopHeader from "../../components/ShopHeader.vue";
import { useStore } from "vuex";
export default {
  components: {
    ShopHeader,
  },
  setup() {
    const store = useStore();
    store.dispatch("getShopInfo");
    return {

    }
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../../assets/stylus/shopview.styl" scoped></style>