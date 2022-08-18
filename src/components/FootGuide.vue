<template>
  <div class="footer_guide">
    <router-link to="/" class="guide_item" active-class="on">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </router-link>
    <router-link to="/search"  class="guide_item" active-class="on">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </router-link>
    <router-link to="/order" class="guide_item" active-class="on">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </router-link>
    <router-link to="/profile" class="guide_item" active-class="on">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "FootGuide",
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/foot.styl" scoped>
</style>