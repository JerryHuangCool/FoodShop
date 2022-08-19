<template>
  <div class="msite">
    <HeaderTop :title="address.name"></HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <swiper class="swiper" :modules="modules" :pagination="{clickable: true}" v-if="categorys.length ">
        <swiper-slide
          class="swiper-slide"
          v-for="(categorys, index) in categorysArr"
          :key="index"
        >
          <a
            href="javascript:"
            class="link_to_food"
            v-for="(category, index) in categorys"
            :key="index"
          >
            <div class="food_container">
              <img :src="base_url + category.image_url" />
            </div>
            <span>{{ category.title }}</span>
          </a>
        </swiper-slide>
        <!-- Add Pagination -->
        <!-- <div class="swiper-pagination"></div> -->
      </swiper>
      <img src="./msite_back.svg" alt="back" v-else>
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
import { useAction } from "../hooks/useAction";
import { onMounted, computed, watch, reactive } from "vue";
import { Swiper, SwiperSlide} from "swiper/vue"; //swiper的vue.js方式，将其作为组件引入
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

    const storeState = useState(["address", "shops", "categorys"]);
    const storeAction = useAction(["getAddress", "getFoodTypes","getShopList"]);
    const getAddress = storeAction.getAddress;
    const getFoodTypes = storeAction.getFoodTypes;
    const getShopList = storeAction.getShopList;
    const base_url = "https://fuss10.elemecdn.com";
    getAddress();
    getFoodTypes();
    getShopList();
    const categorysArr = computed({
      get() {
        const categorys = store.state.categorys;
        const Arr = []; 
        let minArr = [];
        for (let i = 0; i < categorys.length; i++) {
          minArr.push(categorys[i]);
          if (minArr.length === 8) {
            Arr.push(minArr);
            minArr = [];
          }
        }
        return Arr;
      },
    });
    onMounted(() => {
      store.commit("set_header", {
        logShow: true,
        searchShow: true,
      });
    });

    return {
      modules: [Pagination],
      ...storeState,
      ...storeAction,
      categorysArr,
      base_url,
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/msite.styl" scoped></style>