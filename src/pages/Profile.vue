<template>
  <div class="profile">
    <HeaderTop :title="title"></HeaderTop>
    <section class="profile-number">
      <router-link
        :to="userInfo._id ? 'userinfo' : '/login'"
        class="profile-link"
      >
        <div class="profile_image">
          <i class="iconfont icon-person"></i>
        </div>
        <div class="user-info">
          <p class="user-info-top">
            {{
              Object.keys(userInfo).length !== 0
                ? userInfo.name || userInfo.phone
                : "登录/注册"
            }}
          </p>
          <p>
            <span class="user-icon">
              <i class="iconfont icon-shouji icon-mobile"></i>
            </span>
            <span class="icon-mobile-number">{{
              userInfo.phone || "暂无绑定手机号"
            }}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-order-s"></i>
        </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-jifen"></i>
        </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
      <!-- 硅谷外卖会员卡 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-vip"></i>
        </span>
        <div class="my_order_div">
          <span>硅谷外卖会员卡</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-fuwu"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
            <i class="iconfont icon-jiantou1"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <el-popconfirm title="确定要退出登录吗？" confirm-button-text="确定" cancel-button-text="取消" icon-color= "green" @confirm="logout">
        <template #reference>
          <el-button
            type="danger"
            style="width: 100%"
            v-show="userInfo._id"
          >
            退出登录
          </el-button>
        </template>
      </el-popconfirm>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted } from "vue";
import { useState } from "../hooks/useState";
import HeaderTop from "@/components/HeaderTop.vue";
export default {
  name: "Profile",
  setup() {
    const store = useStore();
    const Storestate = useState(["userInfo"]);
    let title = "我的";
    onMounted(() => {
      store.commit("set_header", {
        logShow: false,
        searchShow: false,
      });
    });
    function logout() {
      store.dispatch('logout');
    }
    return {
      title,
      ...Storestate,
      logout
    };
  },
  components: {
    HeaderTop,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/profile.styl" scoped></style>