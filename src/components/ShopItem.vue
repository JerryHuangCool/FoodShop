<template>
  <li class="shop_li border-1px">
    <a>
      <div class="shop_left">
        <img class="shop_img" :src="base_url + shopState.image_path" />
      </div>
      <div class="shop_right">
        <section class="shop_detail_header">
          <h4 class="shop_title ellipsis">{{ shopState.name }}</h4>
          <ul class="shop_detail_ul">
            <li class="supports" v-for="(support, index) in shopState.supports" :key="index">{{support.icon_name}}</li>
          </ul>
        </section>
        <section class="shop_rating_order">
          <section class="shop_rating_order_left">
            <Star :score="shopState.rating" :size="24"></Star>
            <div class="rating_section">{{shopState.rating}}</div>
            <div class="order_section">月售{{shopState.recent_order_num}}单</div>
          </section>
          <section class="shop_rating_order_right">
            <span class="delivery_style delivery_right">{{
              shopState.delivery_mode.text
            }}</span>
          </section>
        </section>
        <section class="shop_distance">
          <p class="shop_delivery_msg">
            <span>¥{{shopState.float_minimum_order_amount}}起送</span>
            <span class="segmentation">/</span>
            <span>配送费约¥{{shopState.float_delivery_fee}}</span>
          </p>
        </section>
      </div>
    </a>
  </li>
</template>

<script>
import Star from './Star.vue';
export default {
    name: "ShopItem",
    props: ["shopState"],
    setup() {
        const base_url = "http://cangdu.org:8001/img/";
        return {
            base_url,
        };
    },
    components: { Star }
};
</script>

<style>
</style>