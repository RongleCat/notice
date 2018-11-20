<template>
  <div class="replydetail">
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
        pd: null
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

      that.$http.get(url, {
        params
      }).then(r => {
        console.log(r)
        if (r) {
          that.pd = r
        }
      }).catch(err => {
        console.error(err)
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