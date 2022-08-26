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
          <div class="pay" :class="payClass">{{ payText }}</div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="isShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <el-popconfirm
              title="确定要清空购物车吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon-color="green"
              @confirm="clearCart"
            >
              <template #reference>
                <span class="empty">清空</span>
              </template>
            </el-popconfirm>
          </div>
          <div class="list-content" ref="shopList">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <div class="cartcontrol">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="isShow" @click="showList"></div>
  </div>
</template>

<script>
import { useState } from "../hooks/useState";
import { useGetter } from "../hooks/useGetter";
import { computed, ref, nextTick, reactive } from "vue";
import CartControl from "./CartControl.vue";
import BScroll from "@better-scroll/core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const storeState = useState(["cartFoods", "info"]);
    const storeGetter = useGetter(["totalCount", "totalPrice"]);
    const totalPrice = storeGetter.totalPrice;
    const totalCount = storeGetter.totalCount;
    const info = storeState.info;
    const listShow = ref(false);
    const shopList = ref(null);
    const shopListScroll = reactive({});
    const isShow = computed({
      get() {
        if (totalCount.value === 0) {
          listShow.value = false;
          return false;
        }
        return listShow.value;
      },
    });
    const payText = computed({
      get() {
        if (totalPrice.value === 0) {
          return `￥${info.value.minPrice}起送`;
        } else if (info.value.minPrice > totalPrice.value) {
          return `还差￥${info.value.minPrice - totalPrice.value}起送`;
        } else {
          return "去结算";
        }
      },
    });
    const payClass = computed({
      get() {
        return info.value.minPrice > totalPrice.value ? "not-enough" : "enough";
      },
    });
    function showList() {
      if (totalCount.value !== 0) listShow.value = !listShow.value;
      if (isShow) {
        nextTick(() => {
          //实现bs对象是一个单例
          if (!shopListScroll.bs) {
            shopListScroll.bs = new BScroll(shopList.value, {
              scrollY: true,
              click: true, // 默认不开启点击监听，需手动开启
              disableMouse: false, //启用鼠标拖动
              disableTouch: false, //启用手指触摸
            });
          } else {
            shopListScroll.bs.refresh(); //让滚动条刷新，重新统计list高度，适配动态list
          }
        });
      }
    }
    function clearCart() {
      store.dispatch('clearCart');
    }
    return {
      ...storeState,
      ...storeGetter,
      payText,
      payClass,
      listShow,
      showList,
      isShow,
      shopList,
      shopListScroll,
      clearCart
    };
  },
  components: { CartControl },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/shopcart.styl" scoped></style>