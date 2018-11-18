<template>
  <div class="release-container">
    <van-cell-group :class="[state?'title':'']">
      <van-cell value="标题" />
      <van-cell>
        国贸集团举办海关政策解读及通关规范讲座
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell value="内容" />
      <van-cell>
        7月6日下午，国贸集团所属国际经济党支部联合
        温州海关各党支部、农行城东支行党委，共同举
        办海关政策解读及通关规范讲座。
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell>
        <template slot="title">
          附件
          <div class="text-tip">点击查看大图</div>
        </template>
      </van-cell>
      <van-cell class="file-container">
        <div class="file-item">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/good_01.jpg">
        </div>
        <div class="file-item">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/good_01.jpg">
        </div>
        <div class="file-item">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/good_01.jpg">
        </div>
        <div class="file-item">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/good_01.jpg">
        </div>
        <div class="file-item">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/good_01.jpg">
        </div>
        <div class="file-item">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/good_01.jpg">
        </div>
        <div class="file-item">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/good_01.jpg">
        </div>
        <div class="file-item">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/good_01.jpg">
        </div>
        <div class="file-item">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/good_01.jpg">
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="会议时间" value="2018-11-04 12:00" />
    </van-cell-group>
    <van-cell-group>
      <van-cell>
        <template slot="title">
          参加人员
        </template>
      </van-cell>
      <van-cell class="man-list">
        <div class="item" v-for="i in 9" :key="i">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/1.jpg">
          <div class="name">曹铁柱说是</div>
        </div>
      </van-cell>
    </van-cell-group>

    <van-cell-group v-if="!state">
      <van-cell title="会议签到二维码" isLink value="查看二维码" @click="showQR = true" />
    </van-cell-group>

    <van-cell-group v-if="state">
      <van-cell>
        <template slot="title">
          未参加人员
          <!-- <div class="btn-tip">提醒反馈</div> -->
        </template>
      </van-cell>
      <van-cell class="man-list">
        <div class="item" v-for="i in 9" :key="i">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/1.jpg">
          <div class="name">曹铁柱说是</div>
        </div>
      </van-cell>
    </van-cell-group>
    <div class="bottom-btn">
      <van-button size="large" @click="$router.go(-1)" v-if="state">返回</van-button>
      <van-button size="large" v-else>关闭会议</van-button>
    </div>

    <van-popup v-model="showQR">
      <div class="qr-pop">
        <h3>会议签到二维码</h3>
        <p>请保存二维码，用于会议签到</p>
        <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/qr.jpg">
        <p>↑长按保存二维码</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        state: 1,
        showQR: false
      }
    },
    mounted() {
      this.state = parseInt(this.$route.query.state);
    },
    beforeCreate() {
      document.title = '督办详情'
    }
  }
</script>

<style scoped lang="scss">
  .release-container {
    padding: 30px 0;

    .van-cell-group {
      margin-bottom: 30px;

      &.title {
        background: #fff url('../../assets/images/complete.png') no-repeat;
        background-size: 105px auto;
        background-position: right 15px center;

        .van-cell {
          background: transparent;

          &:after {
            right: 140px;
          }
        }
      }
    }


    .file-container {
      padding-top: 20px;
      padding-bottom: 0;

      @include clearfix;

      .file-item {
        width: 20%;
        padding: 0 20px;
        float: left;
        padding-bottom: 20px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 15px;
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

  .van-popup {

    border-radius: 15px;
    overflow: hidden;
  }

  .qr-pop {
    width: 560px;
    text-align: center;
    padding-bottom: 20px;

    h3 {
      font-size: 34px;
      line-height: 90px;
    }

    p {
      font-size: 24px;
      color: #999;
      line-height: 1.5;
    }

    img {
      width: 100%;
    }
  }
</style>