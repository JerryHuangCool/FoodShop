<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{ alertText }}</p>
      <div class="confrim" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    alertText: String,
  },
  setup(props, context) {
    function closeTip() {
      context.emit("closeTip");
    }
    return {
      closeTip,
    };
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" src="../assets/stylus/alerttip.styl" scoped></style>