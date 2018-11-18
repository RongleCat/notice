<template>
  <div class="release-container">
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
        <div class="item" v-else v-for="(i,index) in pageData.userAList" :key="index" @click="$router.push(`/supervise/replydetail/${id}/${i.id}`)">
          <img :src="i.avatar">
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
          <img :src="i.avatar">
          <div class="name">{{i.name}}</div>
        </div>
      </van-cell>
    </van-cell-group>
    <div class="bottom-btn">
      <van-button size="large" @click="closeWork">关闭流程</van-button>
    </div>
  </div>
</template>

<script>
  import {
    Toast
  } from "vant";
  export default {
    data() {
      return {
        pageData: null
      }
    },
    beforeCreate() {
      document.title = '督办详情'
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      images() {
        if (this.pageData) {
          return this.pageData.attachment.split('|')
        } else {
          return []
        }
      }
    },
    mounted() {
      let that = this
      that.$http.get('/api/WorkNotify/WorkNotifyDetail', {
        params: {
          id: that.id
        }
      }).then(r => {
        that.pageData = r
        console.log(r);
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