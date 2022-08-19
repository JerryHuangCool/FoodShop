<template>
  <!--首页头部-->
  <div class="header">
    <span class="header_search" v-show="h_search_show">
      <i class="iconfont icon-sousuo"></i>
    </span>
    <span class="header_title">
      <span class="header_title_text ellipsis">
        {{ title }}
      </span>
    </span>
    <span class="header_login" v-show="h_log_show">
      <span class="header_login_text">登录|注册</span>
    </span>
  </div>
</template>

<script>
import { useState } from "../hooks/useState";

export default {
  components: {},
  props:['title'],
  setup() {
    const storeState = useState(["h_log_show", "h_search_show"]);
    return {
      ...storeState,
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/header.styl"></style>