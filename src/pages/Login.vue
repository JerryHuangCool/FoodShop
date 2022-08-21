<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone || computeTime > 0"
                class="get_verification"
                :class="{ right_phone: rightPhone && computeTime === 0 }"
                @click.prevent="sendCaptcha"
              >
                <!-- 需要取消按钮的默认行为，否则会直接提交表单 -->
                {{ computeTime > 0 ? `已发送(${computeTime})` : "获取验证码" }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-if="showPassWord"
                  v-model="passWord"
                />
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-else
                  v-model="passWord"
                />
                <div
                  class="switch_button"
                  :class="showPassWord ? 'on' : 'off'"
                  @click="showPassWord = !showPassWord"
                >
                  <div
                    class="switch_circle"
                    :class="{ right: showPassWord }"
                  ></div>
                  <span class="switch_text">{{
                    showPassWord ? "abc" : "..."
                  }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="../assets/images/captcha.svg"
                  alt="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <router-link to="/profile" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </router-link>
    </div>
    <AlertTip :alertText="alertText" v-if="showAlert" @closeTip="closeTip"></AlertTip>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import AlertTip from "@/components/AlertTip.vue";
export default {
  name: "Login",
  setup() {
    let loginWay = ref(true); //true代表短信登录，false代表密码登录
    let phone = ref("");
    let rightPhone = computed({
      get() {
        let phoneReg =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        return phoneReg.test(phone.value);
      },
    });
    let computeTime = ref(0); //计时时间
    //获取短信验证码
    function sendCaptcha() {
      //启动倒计时
      computeTime.value = 30;
      const timer = setInterval(() => {
        computeTime.value--;
        //到时间停止计时
        if (computeTime.value === 0) {
          clearInterval(timer);
        }
      }, 1000);
      //发送ajax请求
      console.log(1);
    }
    let showPassWord = ref(false);
    let passWord = ref("");
    let code = ref(""); //短信验证码
    let name = ref(""); //用户名
    let captcha = ref(""); //图形验证码
    let alertText = ref(""); //弹窗显示
    let showAlert = ref(false); //是否显示弹窗
    function showText(text) {
      showAlert.value = true;
      alertText.value = text;
    }
    //提交登录表单
    function login() {
      //前台表单验证
      if (loginWay.value === true) {
        //短信登录
        if (!rightPhone.value) {
          //手机不正确
          showText('手机不正确');
          
        } else if (!/^\d{6}$/.test(code)) {
          //验证码必须是6位数字
          showText('验证码必须是6位数字');
        }
      } else {
        //密码登录
        if (!name.value) {
          //用户名必须指定
          showText('用户名必须指定');
        } else if (!passWord.value) {
          //密码必须指定
         showText('密码必须指定');
        } else if (!captcha.value) {
          //验证码必须指定
          showText('验证码必须指定');
        }
      }
    }
    function closeTip() {
      showAlert.value = false;
    }
    return {
      loginWay,
      phone,
      rightPhone,
      sendCaptcha,
      computeTime,
      showPassWord,
      passWord,
      login,
      code,
      name,
      captcha,
      alertText,
      showAlert,
      closeTip,

    };
  },
  components: { AlertTip },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/login.styl" scoped></style>