<template>
  <div class="search">
    <form class="search_form" action="#">
      <input
        type="search"
        name="search"
        placeholder="请输入商家或美食名称"
        class="search_input"
      />
      <input type="submit" name="submit" class="search_submit" />
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
export default {
  name: "Search",
  setup() {
    const store = useStore();
    let title = "搜索";
    onMounted(() => {
      store.commit("set_header", {
        title,
        logShow: false,
        searchShow: false,
      });
    });
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/search.styl" scoped></style>