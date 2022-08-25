<template>
  <div class="food" v-if="isShow">
    <div class="food-content">
      <div class="image-header">
        <img
          :src="food.info.image"
        />
        <p class="foodpanel-desc">{{food.info.info}}</p>
        <div class="back">
          <i class="iconfont icon-arrow_left" @click="toggleShow"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{ food.info.name }}</h1>
        <div class="detail">
          <span class="sell-count">月售 {{food.info.sellCount}} 份</span>
          <span class="rating">好评率 {{food.info.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.info.price}}</span>
          <span class="old" v-show="food.info.oldPrice">￥{{food.info.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
            <CartControl :food="food.info"></CartControl>
        </div>
      </div>
    </div>
    <div class="food-cover"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import CartControl from "./CartControl.vue";
export default {
    props: ["food"],
    setup() {
        let isShow = ref(false);
        function toggleShow() {
            isShow.value = !isShow.value;
        }
        return {
            isShow,
            toggleShow
        };
    },
    components: { CartControl }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/food.styl" scoped></style>