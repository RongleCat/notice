<template>
  <transition name="fade-in">
    <div class="replydetail" v-if="getJs">
      <van-cell-group>
        <van-cell class="head-block">
          <template slot="title">
            <img :src="pd.user.avatar|defaultHead">
            {{pd.user.name}}
            <div class="state-label">{{pd.replystate?'已反馈':'未反馈'}}</div>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell value="标题" class="bg-f4" />
        <van-cell>
          {{pd.title}}
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell value="内容" class="bg-f4" />
        <van-cell>
          {{pd.content}}
        </van-cell>
      </van-cell-group>
      <van-cell-group v-if="images.length">
        <van-cell class="bg-f4">
          <template slot="title">
            附件
            <div class="text-tip">点击查看大图</div>
          </template>
        </van-cell>
        <van-cell class="file-container">
          <div class="file-item" v-for="(i,index) in images" :key="index" @click="viewImage(i)">
            <div class="main">
              <img :src="i">
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell value="时间" class="bg-f4" />
        <van-cell :value="`${formatTime(pd.startTime)} 至 ${formatTime(pd.endTime)}`" />
      </van-cell-group>
      <van-cell-group>
        <van-cell value="反馈内容" class="bg-f4" />
        <van-cell>
          {{pd.reply}}
        </van-cell>
      </van-cell-group>
      <van-cell-group v-if="replyImages.length">
        <van-cell class="bg-f4">
          <template slot="title">
            反馈附件
            <div class="text-tip">点击查看大图</div>
          </template>
        </van-cell>
        <van-cell class="file-container">
          <div class="file-item" v-for="(i,index) in replyImages" :key="index" @click="viewImageSubmit(i)">
            <div class="main">
              <img :src="i">
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <div class="bottom-btn">
        <van-button size="large" @click="backEvent">返回</van-button>
      </div>
    </div>
  </transition>
</template>

<script>
  import moment from "moment";
  export default {
    beforeCreate() {
      document.title = '反馈详情'
      console.log(this.$route);
    },
    data() {
      return {
        pd: null,
        getJs: false
      }
    },
    computed: {
      Id() {
        return this.$route.params.id
      },
      userId() {
        return this.$route.query.userid || false
      },
      notifyId() {
        return this.$route.query.notifyid || false
      },
      images() {
        if (this.pd && this.pd.attachment) {
          return this.pd.attachment.split('|')
        } else {
          return []
        }
      },
      replyImages() {
        if (this.pd && this.pd.replyAttachment) {
          return this.pd.replyAttachment.split('|')
        } else {
          return []
        }
      }
    },
    mounted() {
      let that = this
      let params = {}
      let url = '/api/WorkNotify/ReplyDetail2'
      if (that.userId && that.notifyId) {
        params.userId = that.userId
        params.notifyId = that.notifyId
        url = '/api/WorkNotify/ReplyDetail'
      } else {
        params.Id = that.Id
      }

      that.$http.get('/api/worknotify/ticket', {
        params: {
          url: encodeURIComponent(window.location.href.split('#')[0])
        }
      }).then(r => {
        if (r) {
          window.wx.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wwb380417e702d20f6', // 必填，企业微信的corpID
            nonceStr: r.nonceStr,
            signature: r.signature,
            timestamp: r.timestamp,
            jsApiList: ['selectEnterpriseContact', 'previewImage', 'uploadImage', 'chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });

          window.wx.ready(function () {
            that.$http.get(url, {
              params
            }).then(r => {
              if (r) {
                that.pd = r
                that.getJs = true
              }
            }).catch(err => {
              console.error(err)
            })
          })

          window.wx.error(function (res) {
            console.log(res);
          });
        }
      })

    },
    methods: {
      viewImage(url) {
        let that = this
        window.wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: that.images // 需要预览的图片http链接列表
        });
      },
      viewImageSubmit(url) {
        let that = this
        window.wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: that.replyImages // 需要预览的图片http链接列表
        });
      },
      formatTime(str) {
        let len = str.length
        let time = str.substring(6, len - 2)
        return moment(time.length === 10 ? parseInt(time) * 1000 : parseInt(time)).format('YYYY-MM-DD HH:mm')
      },
      backEvent() {
        if (this.$route.query.type === 'notice') {
          this.$router.replace('/supervise/myreply')
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .replydetail {
    padding: 30px 0;

    .van-cell.bg-f4 {
      background: #f4f4f4;

      &::after {
        left: 0;
      }
    }

    .head-block {
      height: 110px;
      padding-left: 125px !important;
      line-height: 70px;

      img {
        position: absolute;
        width: 70px;
        height: 70px;
        top: 20px;
        left: 30px;
      }

      .state-label {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        height: 48px;
        line-height: 48px;
        padding: 0 24px;
        position: absolute;
        font-size: 24px;
        color: #fff;
        background: #f9a910;
        border-radius: 24px;
      }
    }

    .file-container {
      padding-top: 20px;
      padding-bottom: 0;

      @include clearfix;

      .file-item {
        width: 20%;
        float: left;
        border-radius: 5px;
        padding: 10px;

        .main {
          width: 100%;
          padding-top: 100%;
          @include tapMask;
          overflow: hidden;
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          position: absolute;
          top: 0;
          left: 0;
          object-fit: cover;
        }
      }
    }

    .bottom-btn {
      padding: 0 30px;
      padding-top: 30px;

      .van-button {
        background: #2f7dcd;
        color: #fff;
        border-radius: 15px;
      }
    }

    .text-tip {
      font-size: 20px;
      color: #999;

      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>