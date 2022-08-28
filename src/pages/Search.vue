<template>
  <div class="search">
    <HeaderTop :title="title"></HeaderTop>
    <form class="search_form" @submit.prevent="search">
      <input
        type="search"
        name="search"
        placeholder="请输入商家或美食名称"
        class="search_input"
        v-model="keyWord"
      />
      <input type="submit" name="submit" class="search_submit" />
    </form>
    <section class="list" v-if="!noSearchShops">
      <ul class="list_container">
        <router-link :to="{path:'/shop',query:{id:shop.id}}" tag="li" class="list_li" v-for="(shop,index) in searchShops" :key="index">
          <section class="item_left">
            <img
              :src="imgBaseUrl + shop.image_path"
              class="restaurant_img"
            />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{shop.name}}</span>
              </p>
              <p>月售 {{shop.recent_order_num}} 单</p>
              <p>{{shop.float_minimum_order_amount}} 元起送 / 距离{{shop.distance}}公里</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useState } from "../hooks/useState";
import { onMounted, ref,watch } from "vue";
import HeaderTop from "@/components/HeaderTop.vue";
export default {
  name: "Search",
  setup() {
    const store = useStore();
    const keyWord = ref("");
    const imgBaseUrl = 'http://cangdu.org:8001/img/';
    const storeState = useState(['searchShops']);
    const searchShops = storeState.searchShops
    const noSearchShops = ref(false);
    watch(searchShops,() => {
      noSearchShops.value = false;
      if(!searchShops.value.length){
        noSearchShops.value = true;
      }
    },{deep:true});
    let title = "搜索";
    onMounted(() => {
      store.commit("set_header", {
        logShow: false,
        searchShow: false,
      });
    });
    function search() {
      if (keyWord.value) {
        store.dispatch("searchShop", keyWord.value);
      }
    }
    return {
      title,
      keyWord,
      search,
      ...storeState,
      imgBaseUrl,
      noSearchShops
    };
  },
  components: { HeaderTop },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/search.styl" scoped></style>