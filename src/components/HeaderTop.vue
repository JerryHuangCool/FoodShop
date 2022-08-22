<template>
  <!--首页头部-->
  <div class="header">
    <router-link class="header_search" v-show="h_search_show" to="/search">
      <i class="iconfont icon-sousuo"></i>
    </router-link>
    <span class="header_title">
      <span class="header_title_text ellipsis">
        {{ title }}
      </span>
    </span>
    <router-link class="header_login" v-show="h_log_show" :to="userInfo._id ? 'userinfo': '/login'">
      <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
      <i class="iconfont icon-person" v-else></i>
    </router-link>
  </div>
</template>

<script>
import { useState } from "../hooks/useState";

export default {
  components: {},
  props:['title'],
  setup() {
    const storeState = useState(["h_log_show", "h_search_show","userInfo"]);
    return {
      ...storeState,
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/header.styl"></style>