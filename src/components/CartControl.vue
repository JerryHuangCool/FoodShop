<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="iconfont icon-remove_circle_outline"
        v-show="food.count"
        @click="updateFoodCount(false)"
      ></div>
    </transition>
    <div class="cart-count" v-show="food.count">{{ food.count }}</div>
    <div class="iconfont icon-add_circle" @click="updateFoodCount(true)"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  props: ["food"],
  setup(props) {
    const store = useStore();
    function updateFoodCount(isAdd) {
      store.dispatch("updateFoodCount", { isAdd, food: props.food });
    }
    return {
      updateFoodCount,
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/cartcontrol.styl" scoped></style>