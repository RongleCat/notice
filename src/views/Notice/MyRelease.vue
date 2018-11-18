<template>
  <div class="page" fabu>
    <div class="item" @click="$router.push('/notice/releasedetail/100?state='+i%2)" v-for="i in 10" :key="i">
      <van-panel title="国贸集团举办海关政策解读及通关规范讲座">
        <div class="item-content">
          2018-10-20 至 2018-10-28
          <div class="state-label" :class="[i%2?'end':'']">{{i%2?'已完成':'未完成'}}</div>
        </div>
      </van-panel>
    </div>

  </div>
</template>

<script>
  export default {
    beforeCreate() {
      document.title = '我的发布'
    }
  }
</script>

<style scoped lang="scss">
  .page[fabu] {
    padding-top: 30px;

    .van-cell-group {
      margin-bottom: 30px;

      .item-content {
        padding: 30px;
        line-height: 48px;
        font-size: 24px;
        position: relative;

        .state-label {
          height: 48px;
          line-height: 48px;
          padding: 0 24px;
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 24px;
          color: #fff;
          background: #0a95e9;
          border-radius: 24px;

          &.end {
            background: #aaa;
          }
        }
      }


    }

    .item {
      @include tapMask;
    }
  }
</style>