<template>
  <div class="submit-container">
    <van-cell-group>
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
      <van-cell title="开始时间" value="2018-11-04" />
      <van-cell title="结束时间" value="2019-01-01" />
    </van-cell-group>
    <van-cell-group>
      <van-cell value="反馈内容" />
      <van-field v-model="content" type="textarea" placeholder="请输入反馈内容" rows="1" autosize />
    </van-cell-group>
    <van-cell-group>
      <van-cell value="附件" />
      <van-cell>
        <div class="add-file">
          <i class="iconfont icon-fujian"></i>
        </div>
      </van-cell>
    </van-cell-group>

    <div class="bottom-btn">
      <van-button size="large" @click="$router.replace('/notice/myreply')">提交</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: ''
      }
    },
    beforeCreate() {
      document.title = '提交反馈'
    }
  }
</script>

<style scoped lang="scss">
  .submit-container {
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

    .add-file {
      width: 72px;
      height: 72px;
      border: 1px solid #ccc;
      color: #ccc;
      border-radius: 5px;
      text-align: center;
      line-height: 72px;
      @include tapMask;

      .iconfont {
        font-size: 48px;
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