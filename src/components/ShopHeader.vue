<template>
  <div class="shop-header" v-if="info.bgImg">
    <nav class="shop-nav" :style="{ backgroundImage: `url(${info.bgImg})` }">
      <a class="back" @click="router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
    </nav>
    <div class="shop-content" @click="toggleShopShow">
      <img class="content-image" :src="info.avatar" />
      <div class="header-content">
        <h2 class="content-title">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
          <span class="content-name">{{ info.name }}</span>
          <i class="content-icon"></i>
        </h2>
        <div class="shop-message">
          <span class="shop-message-detail">{{ info.score }}</span>
          <span class="shop-message-detail">月售 {{ info.sellCount }} 单</span>
          <span class="shop-message-detail">
            {{ info.description }}
            <span>约 {{ info.deliveryTime }} 分钟</span>
          </span>
          <span class="shop-message-detail">距离 {{ info.distance }}</span>
        </div>
      </div>
    </div>
    <div
      class="shop-header-discounts"
      v-if="info.supports"
      @click="toggleSupportShow"
    >
      <div class="discounts-left">
        <div class="activity" :class="supportClasses[info.supports[0].type]">
          <!-- 三级表达式会出现问题 -->
          <span class="content-tag">
            <span class="mini-tag">{{ info.supports[0].name }}</span>
          </span>
          <span class="activity-content ellipsis">{{
            info.supports[0].name
          }}</span>
        </div>
      </div>
      <div class="discounts-right">{{ info.supports.length }}个优惠</div>
    </div>
    <transition name="fade">
      <div class="shop-brief-modal" v-show="shopShow">
        <div class="brief-modal-content">
          <h2 class="content-title">
            <span class="content-tag">
              <span class="mini-tag">品牌</span>
            </span>
            <span class="content-name">{{ info.name }}</span>
          </h2>
          <ul class="brief-modal-msg">
            <li>
              <h3>{{ info.score }}</h3>
              <p>评分</p>
            </li>
            <li>
              <h3>{{ info.sellCount }} 单</h3>
              <p>月售</p>
            </li>
            <li>
              <h3>{{ info.description }}</h3>
              <p>约 {{ info.deliveryTime }} 分钟</p>
            </li>
            <li>
              <h3>{{ info.deliveryPrice }} 元</h3>
              <p>配送费用</p>
            </li>
            <li>
              <h3>{{ info.distance }}</h3>
              <p>距离</p>
            </li>
          </ul>
          <h3 class="brief-modal-title"><span>公告</span></h3>
          <div class="brief-modal-notice">
            {{ info.bulletin }}
          </div>
          <div class="mask-footer">
            <span class="iconfont icon-close" @click="toggleShopShow"></span>
          </div>
        </div>
        <div class="brief-modal-cover"></div>
      </div>
    </transition>
    <transition name="fade">
      <div class="activity-sheet" v-show="supportShow">
        <div class="activity-sheet-content">
          <h2 class="activity-sheet-title">优惠活动</h2>
          <ul class="list">
            <li
              class="activity-item"
              v-for="(support, index) in info.supports"
              :key="index"
              :class="supportClasses[support.type]"
            >
              <span class="content-tag">
                <span class="mini-tag">{{ support.name }}</span>
              </span>
              <span class="activity-content">{{ support.content }}</span>
            </li>
          </ul>
          <div class="activity-sheet-close">
            <span class="iconfont icon-close" @click="toggleSupportShow"></span>
          </div>
        </div>
        <div class="activity-sheet-cover"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useState } from "../hooks/useState";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  setup() {
    const storeState = useState(["info"]);
    const router = useRouter();
    const supportClasses = [
      "activity-green",
      "activity-red",
      "activity-orange",
    ];
    let shopShow = ref(false);
    let supportShow = ref(false);
    function toggleShopShow() {
      shopShow.value = !shopShow.value;
    }
    function toggleSupportShow() {
      supportShow.value = !supportShow.value;
    }
    return {
      ...storeState,
      router,
      supportClasses,
      shopShow,
      supportShow,
      toggleShopShow,
      toggleSupportShow,
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/shopheader.styl" scoped></style>