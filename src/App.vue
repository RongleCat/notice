<template>
  <div id="app">
    <transition name="pop-bottom">
      <TheTabber class="com-tabber" v-if="showTabber"></TheTabber>
    </transition>
    <transition :name="direction">
      <router-view class="view-main" />
    </transition>
  </div>
</template>

<script>
  import TheTabber from "@/components/TheTabber.vue";
  let allRouter = [
    "noticeReplyDetail",
    "noticeReleaseDetail",
    "noticeCreateRelease",
    "noticeMyReply",
    "noticeMyRelease",
    "noticeHome",
    "superviseReplyDetail",
    "superviseReleaseDetail",
    "superviseCreateRelease",
    "superviseMyReply",
    "superviseMyRelease",
    "superviseHome"
  ];
  export default {
    name: "app",
    components: {
      TheTabber
    },
    data() {
      return {
        direction: "",
        showTabber: false
      };
    },
    beforeMount() {
      if (this.$route.name == 'signHome' || this.$route.name == 'noticeHome') {
        this.showTabber = true
      }
    },
    watch: {
      $route: function (to, form) {
        if (to.name == 'signHome' || to.name == 'noticeHome') {
          this.showTabber = true
        } else {
          this.showTabber = false
        }
        let _before = allRouter.indexOf(to.name),
          _after = allRouter.indexOf(form.name);
        if (_before < _after) {
          this.direction = "fade-left";
        } else {
          this.direction = "fade-right";
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/scss/common.scss";
  @import "./assets/scss/transition.scss";
  @import "./assets/scss/cover.scss";
</style>