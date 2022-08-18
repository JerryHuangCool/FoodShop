<template>
  <div class="order">
    <HeaderTop :title="title"></HeaderTop>
    <section class="order_no_login">
      <img src="../assets/images/order/person.png" />
      <h3>登录后查看外卖订单</h3>
      <button>立即登陆</button>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
import HeaderTop from "@/components/HeaderTop.vue";
export default {
    name: "Order",
    setup() {
        const store = useStore();
        let title = "订单列表";
        onMounted(() => {
            store.commit("set_header", {
                logShow: false,
                searchShow: false,
            });
        });
        return {
          title
        };
    },
    components: { HeaderTop }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/order.styl" scoped></style>
