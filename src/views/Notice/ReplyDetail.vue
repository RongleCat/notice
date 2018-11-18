<template>
  <div class="replydetail">
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
    <div class="bottom-btn">
      <van-button size="large" @click="$router.go(-1)">返回</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        state: 1
      }
    },
    beforeCreate() {
      document.title = '反馈详情'
    }
  }
</script>

<style scoped lang="scss">
  .replydetail {
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

    .bottom-btn {
      padding: 0 30px;
      padding-top: 30px;

      .van-button {
        background: #2f7dcd;
        color: #fff;
        border-radius: 15px;
      }
    }
  }
</style>