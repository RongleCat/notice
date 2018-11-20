<template>
  <div class="replydetail">
    <van-cell-group>
      <van-cell class="head-block">
        <template slot="title">
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/1.jpg">
          曹铁柱
          <div class="state-label">已反馈</div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell value="标题" class="bg-f4" />
      <van-cell>
        国贸集团举办海关政策解读及通关规范讲座
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell value="内容" class="bg-f4" />
      <van-cell>
        7月6日下午，国贸集团所属国际经济党支部联合
        温州海关各党支部、农行城东支行党委，共同举
        办海关政策解读及通关规范讲座。
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell value="时间" class="bg-f4" />
      <van-cell value="2018-11-04 至 2019-01-01" />
    </van-cell-group>
    <van-cell-group>
      <van-cell value="反馈内容" class="bg-f4" />
      <van-cell>
        温州海关各党支部、农行城东支行党委，共同举
        办海关政策解读及通关规范讲座。
      </van-cell>
    </van-cell-group>
    <div class="bottom-btn">
      <van-button size="large" @click="$router.go(-1)">返回</van-button>
    </div>
  </div>
</template>

<script>
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