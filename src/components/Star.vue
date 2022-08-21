<template>
  <div class="star" :class="'star-' + size">
    <span
      class="star-item"
      v-for="(sc, index) in starClasses"
      :key="index"
      :class="sc"
    ></span>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    score: Number,
    size: Number,
  },
  setup(props) {
    let starClasses = computed({
      get() {
        const scs = [];
        let num = Math.floor(props.score);//向下取整
        let rem = props.score * 10 - num * 10;//避免JS小数运算不精准
        while (num > 0) {
          num--;
          scs.push("on");
        }
        if (rem >= 5) {
          scs.push("half");
        }
        while (scs.length < 5) {
          scs.push("off");
        }
        return scs;
      },
    });
    return {
      starClasses,
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/star.styl"></style>