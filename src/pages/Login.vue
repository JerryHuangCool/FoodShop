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
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captchaTag"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span @click="goBack" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
    <AlertTip
      :alertText="alertText"
      v-if="showAlert"
      @closeTip="closeTip"
    ></AlertTip>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import AlertTip from "@/components/AlertTip.vue";
import { reqLoginPwd, reqSendCode, reqLoginPhone } from "../api/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const store = useStore();
    let loginWay = ref(true); //true代表短信登录，false代表密码登录
    let phone = ref("");
    const captchaTag = ref(null);
    let rightPhone = computed({
      get() {
        let phoneReg =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        return phoneReg.test(phone.value);
      },
    });
    let computeTime = ref(0); //计时时间
    let timer;//定时器id
    //获取短信验证码
    async function sendCaptcha() {
      //启动倒计时
      computeTime.value = 30;
       timer = setInterval(() => {
        computeTime.value--;
        //到时间停止计时
        if (computeTime.value === 0) {
          clearInterval(timer);
        }
      }, 1000);
      //发送ajax请求
      const res = await reqSendCode(phone.value);
      if (res.code === 1) {
        //显示提示，停止倒计时
        showText(res.msg);
        if (computeTime.value) {
          computeTime.value = 0;
          clearInterval(timer);
        }
      }
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
    async function login() {
      let res; //接收结果的变量
      //前台表单验证
      if (loginWay.value === true) {
        //短信登录
        if (!rightPhone.value) {
          //手机不正确
          showText("手机不正确");
          return;
        } else if (!/^\d{6}$/.test(code.value)) {
          //验证码必须是6位数字
          showText("验证码必须是6位数字");
          return;
        }
        //短信登录
        res = await reqLoginPhone(phone.value, code.value);
      } else {
        //密码登录
        if (!name.value) {
          //用户名必须指定
          showText("用户名必须指定");
          getCaptcha();
          return;
        } else if (!passWord.value) {
          //密码必须指定
          showText("密码必须指定");
          getCaptcha();
          return;
        } else if (!captcha.value) {
          //验证码必须指定
          showText("验证码必须指定");
          getCaptcha();
          return;
        }
        //密码登录
        res = await reqLoginPwd(name.value, passWord.value, captcha.value);
      }
      clearInterval(timer);
      if (res.code === 0) {
        //成功
        const userinfo = res.data;
        //设置登录状态
        store.dispatch('recordUser',userinfo);
        //跳转页面
        router.replace('/profile');
      } else {
        //失败提示弹窗
        showText(res.msg);
        getCaptcha();
      }
      
    }
    function closeTip() {
      //关闭警告框
      showAlert.value = false;
    }
    function getCaptcha() {
      //给链接加时间戳来刷新请求，非ajax请求没有跨域问题
      //vue3的ref属性需要先定义一个ref的空变量，将该变量作为ref属性绑定给标签，调用时需要.value
      captchaTag.value.src = "http://localhost:4000/captcha?time=" + Date.now();
    }
    function goBack() {
      router.back();
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
      getCaptcha,
      captchaTag,
      goBack
    };
  },
  components: { AlertTip },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/login.styl" scoped></style>