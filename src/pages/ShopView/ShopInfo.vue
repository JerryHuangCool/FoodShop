<template>
  <div class="shop-info" ref="infoContent">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">{{ info.description }}</span>
            <span
              >由商家配送提供配送，约 {{ info.deliveryTime }} 分钟送达，距离
              {{ info.distance }}</span
            >
          </div>
          <div class="delivery-money">配送费￥{{ info.deliveryPrice }}</div>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div
            class="activity-item"
            v-for="(support, index) in info.supports"
            :key="index"
            :class="suppotrType[support.type]"
          >
            <span class="content-tag">
              <span class="mini-tag">{{ support.name }}</span>
            </span>
            <span class="activity-content">{{ support.content }}</span>
          </div>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in info.pics" :key="index">
              <img width="120" height="90" :src="pic" />
            </li>
          </ul>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li>
            <span class="bold">品类</span> <span>{{ info.category }}</span>
          </li>
          <li>
            <span class="bold">商家电话</span> <span>{{ info.phone }}</span>
          </li>
          <li>
            <span class="bold">地址</span> <span>{{ info.address }}</span>
          </li>
          <li>
            <span class="bold">营业时间</span> <span>{{ info.workTime }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { useState } from "../../hooks/useState";
import BScroll from "@better-scroll/core";
import { reactive, nextTick, ref,watch,onMounted } from "vue";
export default {
  setup() {
    const { info } = useState(["info"]);
    const suppotrType = ["activity-green", "activity-red", "activity-orange"];
    const infoScroll = reactive({});
    const infoContent = ref(null);
    const picWrapper = ref(null);
    const picList = ref(null);
    //当通过其他界面跳转，info有数据
    onMounted(() => {
        if(!info.value.name){
            return
        }
        _initScroll();
    }),
    //当直接刷新本页面时，info需要异步获取，而页面直接创建，所有需要用watch监视info，确保info有数据在创建滑动
    watch(info,(oldVal,newVal) => {
         _initScroll();
    },{deep:true});
   function _initScroll() {
    nextTick(() => {
      if (!infoScroll.bs) {
        infoScroll.bs = new BScroll(infoContent.value, {
          scrollY: true,
          click: true, // 默认不开启点击监听，需手动开启
          disableMouse: false, //启用鼠标拖动
          disableTouch: false, //启用手指触摸
        });
      }else {
        infoScroll.bs.refresh();
      }
      picList.value.style.width = (120 + 6) * info.value.pics.length -6 + 'px';
      infoScroll.picScroll = new BScroll(picWrapper.value, {
        scrollX: true,
        click: true, // 默认不开启点击监听，需手动开启
        disableMouse: false, //启用鼠标拖动
        disableTouch: false, //启用手指触摸
      });
    });
   }

    return {
      info,
      suppotrType,
      infoContent,
      infoScroll,
      picWrapper,
      picList,
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../../assets/stylus/shopinfo.styl" scoped></style>