<template>
 <li class="shop_li border-1px">
        <a>
          <div class="shop_left">
            <img class="shop_img" :src="shopState.picture" />
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{shopState.title}}</h4>
              <ul class="shop_detail_ul">
                <li class="supports">保</li>
                <li class="supports">准</li>
                <li class="supports">票</li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <div class="star star-24">
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item half"></span>
                  <span class="star-item off"></span>
                </div>
                <div class="rating_section">{{shopState.rating}}</div>
                <div class="order_section">月售{{shopState.order}}单</div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">硅谷专送</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥{{shopState.o_price}}起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥{{shopState.d_price}}</span>
              </p>
            </section>
          </div>
        </a>
      </li> 
</template>

<script>
export default {
    name: 'ShopItem',
    props: ['shopState'],
    setup(props) {
        let shopState = props.shopState;

        return {
            shopState,
        };
    }

}
</script>

<style>

</style>