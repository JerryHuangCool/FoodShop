<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{ current: index === currentIndex }"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售 {{ food.sellCount }} 份</span>
                    <span>好评率 {{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-show="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="foodInfo"></Food>
  </div>
</template>

<script>
import { computed, ref, nextTick, reactive } from "vue";
import { useStore } from "vuex";
import { useState } from "../../hooks/useState";
import BScroll from "@better-scroll/core";
import CartControl from "../../components/CartControl.vue";
import Food from "../../components/Food.vue";
import ShopCart from "@/components/ShopCart.vue";
export default {
  setup() {
    const store = useStore();
    const storeState = useState(["goods"]);
    //右侧列表当前的y值,滑动过程中搜集
    let scrollY = ref(0);
    //每个分类的开始坐标，在列表第一次显示时搜集
    let tops = ref([]);
    let leftScroll = reactive({});
    let rightScroll = reactive({});
    let food = reactive({});
    //当前分类下标
    const menuWrapper = ref(null);
    const foodsWrapper = ref(null);
    const foodsUl = ref(null);
    const foodInfo = ref(null);
    function _initScroll() {
      //初始化滚动条
      leftScroll.bs = new BScroll(menuWrapper.value, {
        scrollY: true,
        click: true, // 默认不开启点击监听，需手动开启
        disableMouse: false, //启用鼠标拖动
        disableTouch: false, //启用手指触摸
      });
      rightScroll.bs = new BScroll(foodsWrapper.value, {
        scrollY: true,
        click: true,
        probeType: 2,//滚动监听类型
        disableMouse: false, //启用鼠标拖动
        disableTouch: false, //启用手指触摸
      });
      rightScroll.bs.on("scroll", (position) => {
        scrollY.value = Math.abs(position.y);
      });
      rightScroll.bs.on("scrollEnd", (position) => {
        scrollY.value = Math.abs(position.y);
      });
    }
    function _initTops() {
      let newTops = [];
      let top = 0;
      newTops.push(top);
      //拿到所有的li
      const li = foodsUl.value.getElementsByClassName("food-list-hook");
      //这里将li(类数组)，转换为数组，call是因为li的原型链上并没有slice方法
      Array.prototype.slice.call(li).forEach((li) => {
        top += li.clientHeight;
        newTops.push(top);
      });
      tops.value = newTops;
    }
    store.dispatch("getShopGoods", () => {
      nextTick(() => {
        //列表显示之后执行
        
        _initScroll(); //加_表示非事件方法
        _initTops();
      });
    });
    let currentIndex = computed({
      get() {
        //findIndex返回符号条件的第一个下标
        const index = tops.value.findIndex((top, index) => {
          //y值应大于当前分类的top值小于下一个分类的top值
          return scrollY.value >= top && scrollY.value < tops.value[index + 1];
        });
        return index;
      },
    });
    function clickMenuItem(index) {
      //使又侧列表滑动到相应位置,立即更新scrollY是为了改变左侧列表
      scrollY.value = tops.value[index];
      rightScroll.bs.scrollTo(0, -tops.value[index], 300);
    }
    function showFood(thisFood) {
      food.info = thisFood;
      //通过ref调用子组件方法
      foodInfo.value.toggleShow();
    }
    return {
      ...storeState,
      currentIndex,
      scrollY,
      tops,
      menuWrapper,
      foodsWrapper,
      foodsUl,
      clickMenuItem,
      leftScroll,
      rightScroll,
      food,
      showFood,
      foodInfo
    };
  },
  components: { CartControl, Food, ShopCart },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../../assets/stylus/shopgoods.styl" scoped></style>