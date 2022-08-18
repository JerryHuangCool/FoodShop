<template>
  <div class="msite">
    <HeaderTop :title="address.name"></HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <swiper
        class="swiper"
        :modules="modules"
        :pagination="{ clickable: true }"
      >
        <swiper-slide class="swiper-slide">
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/1.jpg" />
            </div>
            <span>甜品饮品</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/2.jpg" />
            </div>
            <span>商超便利</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/3.jpg" />
            </div>
            <span>美食</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/4.jpg" />
            </div>
            <span>简餐</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/5.jpg" />
            </div>
            <span>新店特惠</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/6.jpg" />
            </div>
            <span>准时达</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/7.jpg" />
            </div>
            <span>预订早餐</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/8.jpg" />
            </div>
            <span>土豪推荐</span>
          </a>
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/9.jpg" />
            </div>
            <span>甜品饮品</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/10.jpg" />
            </div>
            <span>商超便利</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/11.jpg" />
            </div>
            <span>美食</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/12.jpg" />
            </div>
            <span>简餐</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/13.jpg" />
            </div>
            <span>新店特惠</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/14.jpg" />
            </div>
            <span>准时达</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/1.jpg" />
            </div>
            <span>预订早餐</span>
          </a>
          <a href="javascript:" class="link_to_food">
            <div class="food_container">
              <img src="../assets/images/nav/2.jpg" />
            </div>
            <span>土豪推荐</span>
          </a>
        </swiper-slide>
        <!-- Add Pagination -->
        <!-- <div class="swiper-pagination"></div> -->
      </swiper>
    </nav>
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useState } from "../hooks/useState";
import { onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue"; //swiper的vue.js方式，将其作为组件引入
import { Pagination } from "swiper"; //swiper8在vue中默认引入没有任何附加模块，需要单独引入
import "swiper/css";
import "swiper/css/pagination";
import ShopList from "@/components/ShopList.vue";
import HeaderTop from "@/components/HeaderTop.vue";

export default {
  name: "MSite",
  components: {
    Swiper,
    SwiperSlide,
    ShopList,
    HeaderTop,
  },
  setup() {
    const store = useStore();
    store.dispatch("getAddress");
    const storeState = useState(["address", "shops", "categorys"]);
    onMounted(() => {
      console.log("页面加载");
    });
    store.commit("set_header", {
      logShow: true,
      searchShow: true,
    });
    
    return {
      modules: [Pagination],
      ...storeState,
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/msite.styl" scoped></style>