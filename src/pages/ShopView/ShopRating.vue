<template>
  <div class="ratings" ref="ratingWrapper">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ info.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 {{ info.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36" />
            <span class="score">{{ info.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36" />
            <span class="score">{{ info.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ info.deliveryTime }} 分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" @click='changeType(2)' :class='{active:selectType===2}'>
            全部<span class="count">{{ratings.length}}</span>
          </span>
          <span class="block positive" @click='changeType(0)' :class='{active:selectType===0}'>
            满意<span class="count">{{positiveSize}}</span>
          </span>
          <span class="block negative" @click='changeType(1)' :class='{active:selectType===1}'>
            不满意<span class="count">{{ratings.length-positiveSize}}</span>
          </span>
        </div>
        <div class="switch" :class="{on: onlyShowText}" @click="onlyShowText=!onlyShowText">
          <span class="iconfont icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper" >
        <ul>
          <li
            class="rating-item"
            v-for="(rating, index) in filterRatings"
            :key="index"
          >
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <Star :score="rating.score" :size="24"></Star>
                <span class="delivery">{{ rating.deliveryTime }}</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType? 'icon-thumb_down':'icon-thumb_up'"></span>
                <span
                  class="item"
                  v-for="(rec, index) in rating.recommend"
                  :key="index"
                  >{{ rec }}</span
                >
              </div>
              <div class="time">{{ rating.rateTime }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useState } from "../../hooks/useState";
import { useGetter } from "../../hooks/useGetter";
import Star from "@/components/Star.vue";
import { useStore } from "vuex";
import { ref, reactive,nextTick,computed } from "vue";
import BScroll from "@better-scroll/core";
export default {
  components: { Star },
  setup() {
    const storeState = useState(["info", "ratings"]);
    const storeGetter = useGetter(["positiveSize"]);
    const ratings = storeState.ratings;
    const store = useStore();
    const ratingWrapper = ref(null);
    const ratingScroll = reactive({});
    const onlyShowText = ref(true);//只显示有文本内容的
    const selectType = ref(2);//选择的评价类型，0满意，1不满意，2全部
    const filterRatings = computed({
        get() {
            return ratings.value.filter(rating => {
                return ( selectType.value === 2 || selectType.value === rating.rateType) && (!onlyShowText.value || rating.text.length > 0);
            });
        }

    });
    store.dispatch("getShopRatings", () => {
        nextTick(()=>{ratingScroll.bs = new BScroll(ratingWrapper.value, {
        scrollY: true,
        click: true, // 默认不开启点击监听，需手动开启
        disableMouse: false, //启用鼠标拖动
        disableTouch: false, //启用手指触摸
      });});
      
    });
    function changeType(type) {
        selectType.value = type;
    }
    return {
      ...storeState,
      ratingWrapper,
      ratingScroll,
      onlyShowText,
      changeType,
      selectType,
      ...storeGetter,
      filterRatings
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../../assets/stylus/shoprating.styl" scoped></style>