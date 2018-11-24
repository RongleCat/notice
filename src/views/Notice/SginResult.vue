<template>
  <transition name="fade-in">
    <div class="result-container" :class="state?'no':'ok'" v-if="pd">
      <div class="main-title">{{state?'签到失败':'签到成功'}}</div>
      <div class="sub-title" v-if="state">{{msg}}</div>
      <div class="btn-confirm" @click="closeWindow">确定</div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        pd: null,
        loadDone: false
      }
    },
    beforeCreate() {
      document.title = '会议签到'
    },
    computed: {
      state() {
        if (this.pd) {
          return !parseInt(this.pd.err)
        } else {
          return false
        }
      },
      msg() {
        if (this.pd) {
          return this.pd.msg
        } else {
          return false
        }
      },
      id() {
        return this.$route.params.id
      }
    },
    methods: {
      closeWindow() {
        window.WeixinJSBridge.call('closeWindow');
      }
    },
    mounted() {
      let that = this
      that.$http.get('/api/meeting/signin', {
        params: {
          Id: that.id
        }
      }).then(r => {
        if (r) {
          that.pd = r
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .result-container {
    background: #fff;
    background-size: 230px auto;
    background-position: center 200px;
    background-repeat: no-repeat;
    padding-top: 450px;
    text-align: center;

    .main-title {
      font-size: 48px;
      line-height: 1.5;
    }

    .sub-title {
      font-size: 30px;
      line-height: 1.5;
    }

    .btn-confirm {
      display: inline-block;
      width: 50%;
      height: 70px;
      border-radius: 10px;
      background: #04be02;
      color: #fff;
      line-height: 72px;
      font-size: 30px;
      margin-top: 200px;
      @include tapColor;
    }

    &.ok {
      background-image: url('../../assets/images/sgin_ok.jpg');
    }

    &.no {
      background-image: url('../../assets/images/sgin_no.jpg');
    }
  }
</style>