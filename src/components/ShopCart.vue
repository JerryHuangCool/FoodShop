<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="showList">
          <div class="logo-wrapper">
            <div
              class="logo"
              :class="{
                highlight: totalCount,
              }"
            >
              <i
                class="iconfont icon-shopping_cart"
                :class="{
                  highlight: totalCount,
                }"
              ></i>
            </div>
            <div class="num" v-if="totalCount">{{ totalCount }}</div>
          </div>
          <div
            class="price"
            :class="{
              highlight: totalCount,
            }"
          >
            ￥{{ totalPrice }}
          </div>
          <div class="desc">另需配送费￥{{ info.deliveryPrice }} 元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{ payText }} </div>
        </div>
      </div>
      <div class="shopcart-list" v-show="isShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="list-content" >
          <ul>
            <li class="food" v-for="(food,index) in cartFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <div class="cartcontrol">
                  <CartControl :food="food"></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="isShow" @click="showList"></div>
  </div>
</template>

<script>
import { useState } from "../hooks/useState";
import { useGetter } from "../hooks/useGetter";
import { computed,ref } from "vue";
import CartControl from "./CartControl.vue";
export default {
    setup() {
        const storeState = useState(["cartFoods", "info"]);
        const storeGetter = useGetter(["totalCount", "totalPrice"]);
        const totalPrice = storeGetter.totalPrice;
        const totalCount = storeGetter.totalCount;
        const info = storeState.info;
        const listShow = ref(false);
        const isShow = computed({
            get() {
                if(totalCount.value === 0) {
                    listShow.value = false;
                    return false;
                }
                return listShow.value;
            }
        });
        const payText = computed({
            get() {
                if (totalPrice.value === 0) {
                    return `￥${info.value.minPrice}起送`;
                }
                else if (info.value.minPrice > totalPrice.value) {
                    return `还差￥${info.value.minPrice - totalPrice.value}起送`;
                }
                else {
                    return "去结算";
                }
            }
        });
        const payClass = computed({
            get() {
                return info.value.minPrice > totalPrice.value ? "not-enough" : "enough";
            }
        });
        function showList() {
            if(totalCount.value !== 0)
                listShow.value = !listShow.value;
        }
        return {
            ...storeState,
            ...storeGetter,
            payText,
            payClass,
            listShow,
            showList,
            isShow
        };
    },
    components: { CartControl }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/shopcart.styl" scoped></style>