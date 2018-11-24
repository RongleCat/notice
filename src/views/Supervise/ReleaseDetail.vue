<template>
  <transition name="fade-in">
    <div class="release-container" v-if="getJs">
      <van-cell-group>
        <van-cell value="标题" />
        <van-cell>
          {{pageData.title}}
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell value="内容" />
        <van-cell>
          {{pageData.content}}
        </van-cell>
      </van-cell-group>
      <van-cell-group v-if="images.length">
        <van-cell>
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
        <van-cell title="开始时间" :value="pageData.startTime|getTime|fTime('YYYY-MM-DD HH:mm')" />
        <van-cell title="结束时间" :value="pageData.endTime|getTime|fTime('YYYY-MM-DD HH:mm')" />
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            已反馈人员
            <div class="text-tip" v-if="pageData.userAList.length">点击查看反馈详情</div>
          </template>
        </van-cell>
        <van-cell class="man-list">
          <div class="no-data" v-if="!pageData.userAList.length">暂无已反馈人员</div>
          <div class="item" v-else v-for="(i,index) in pageData.userAList" :key="index" @click="goReplyDetail(i.id)">
            <img :src="i.avatar||'https://fmcat-common-static.oss-cn-hangzhou.aliyuncs.com/images/default_head.jpg'">
            <div class="name">{{i.name}}</div>
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell>
          <template slot="title">
            未反馈人员
            <div class="btn-tip" @click="emitTip">提醒反馈</div>
          </template>
        </van-cell>
        <van-cell class="man-list">
          <div class="no-data" v-if="!pageData.userBList.length">所有人员已反馈</div>
          <div class="item" v-for="(i,index) in pageData.userBList" :key="index">
            <img :src="i.avatar||'https://fmcat-common-static.oss-cn-hangzhou.aliyuncs.com/images/default_head.jpg'">
            <div class="name">{{i.name}}</div>
          </div>
        </van-cell>
      </van-cell-group>
      <div class="bottom-btn">
        <van-button size="large" @click="$router.go(-1)" v-if="state">返回</van-button>
        <van-button size="large" v-else @click="closeWork">关闭流程</van-button>
      </div>
    </div>
  </transition>
</template>

<script>
  import {
    Toast
  } from "vant";
  export default {
    data() {
      return {
        pageData: null,
        getJs: false
      }
    },
    beforeCreate() {
      document.title = '督办详情'
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      state() {
        return parseInt(this.$route.query.state)
      },
      images() {
        if (this.pageData && this.pageData.attachment) {
          return this.pageData.attachment.split('|')
        } else {
          return []
        }
      }
    },
    mounted() {
      let that = this
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
            that.$http.get('/api/WorkNotify/WorkNotifyDetail', {
              params: {
                id: that.id
              }
            }).then(r => {
              that.pageData = r
              that.getJs = true
              console.log(r);
            })
          })

          window.wx.error(function (res) {
            console.log(res);
          });
        }
      })
    },
    methods: {
      emitTip() {
        let that = this
        let noArr = []
        that.pageData.userBList.map(item => {
          noArr.push(item.id)
        })
        that.$http.post('/api/WorkNotify/Notify', {
          id: that.id,
          Ids: noArr
        }).then(() => {
          // console.log(r);
          Toast.success('已提醒未反馈人员')
        })
      },
      viewImage(url) {
        let that = this
        window.wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: that.images // 需要预览的图片http链接列表
        });
      },
      closeWork() {
        let that = this
        that.$http.post('/api/WorkNotify/Close', {
          id: that.id
        }).then(() => {
          Toast.success('关闭流程成功！')
          setTimeout(() => {
            that.$router.replace('/supervise/myrelease')
          }, 2000);
        })
      },
      goReplyDetail(userid) {
        this.$router.push(`/supervise/replydetail/0?userid=${userid}&notifyid=${this.id}`)
      }
    }
  }
</script>

<style scoped lang="scss">
  .release-container {
    padding: 30px 0;

    .van-cell-group {
      margin-bottom: 30px;
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

    .man-list {
      .item {
        width: 20%;
        float: left;
        padding: 0 20px;
        padding-bottom: 60px;
        position: relative;
        padding-top: 15px;

        img {
          width: 100%;
          display: block;
          border-radius: 15px;
        }

        .name {
          width: 100%;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          line-height: 60px;
          text-align: center;
          @include textof;
        }
      }
    }

    .btn-tip {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      height: 48px;
      line-height: 48px;
      background: #f05e4b;
      font-size: 20px;
      color: #fff;
      padding: 0 20px;
      border-radius: 24px;
      @include tapColor;
    }

    .text-tip {
      font-size: 20px;
      color: #999;

      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
    }

    .bottom-btn {
      padding: 0 30px;

      .van-button {
        background: #2f7dcd;
        color: #fff;
        border-radius: 15px;
      }
    }
  }
</style>