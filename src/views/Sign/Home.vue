<template>
  <div class="home-page">
    <van-cell-group>
      <van-cell is-link>
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bushi"></use>
          </svg>
          <span class="van-cell-text">我要发布</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell is-link>
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kebiao"></use>
          </svg>
          <span class="van-cell-text">我的反馈</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell is-link>
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qingjia"></use>
          </svg>
          <span class="van-cell-text">我的发布</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      document.title = '活动报名'
    }
  }
</script>

<style scoped lang="scss">
  .home-page {
    padding: 30px 0;

    .van-cell-group {
      margin-bottom: 30px;

      .van-cell {
        padding-left: 100px !important;
        position: relative;

        .icon {
          width: 48px;
          height: 48px;
          position: absolute;
          top: 50%;
          left: 30px;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>