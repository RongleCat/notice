<template>
  <div class="home-page">
    <!-- <van-cell-group>
      <van-cell is-link @click="$router.push('/notice/createrelease')">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bushi"></use>
          </svg>
          <span class="van-cell-text">我要发布</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell is-link @click="$router.push('/notice/myreply')">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kebiao"></use>
          </svg>
          <span class="van-cell-text">我的会议</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell is-link @click="$router.push('/notice/myrelease')">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qingjia"></use>
          </svg>
          <span class="van-cell-text">我的发布</span>
        </template>
      </van-cell>
    </van-cell-group> -->
    <div class="tools-container">
      <div class="item item-1" @click="$router.push('/notice/createrelease')">
        我要发布
      </div>
      <div class="item item-2" @click="$router.push('/notice/myreply')">
        我的反馈
      </div>
      <div class="item item-3" @click="$router.push('/notice/myrelease')">
        我的发布
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    beforeCreate() {
      document.title = '会议通知'
    }
  }
</script>

<style scoped lang="scss">
  .home-page {
    .tools-container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      @include oneB;

      .item {
        width: 33.3333%;
        text-align: center;
        height: 210px;
        background-size: 80px auto;
        background-repeat: no-repeat;
        background-position: center 40px;
        background-color: #fff;
        padding-top: 140px;
        line-height: 40px;
        position: relative;
        @include tapColor;

        @for $i from 1 through 3 {
          &.item-#{$i} {
            background-image: url('../../assets/images/home_icon_#{$i}.png');
          }
        }

        &.item-2,
        &.item-3 {
          @include oneL;
        }
      }
    }
  }
</style>