<template>
  <div>
    <div class="nav-list">
      <div class="item">
        <router-link to="/notice" exact>
          <div class="tab-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhuanyelietou"></use>
            </svg>
          </div>
          <div class="tab-text">会议通知</div>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/sign">
          <div class="tab-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-huoyueshijianduan"></use>
            </svg>
          </div>
          <div class="tab-text">活动报名</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    }
  };
</script>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    .nav-list {
      list-style: none;
      height: 100px;
      background: #fff;
      position: relative;
      display: flex;

      // border-top: 1px solid #e5e5e5;
      &::after {
        content: "";
        width: 100%;
        height: 1px;
        /* no */
        background: #e5e5e5;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        transform: scaleY(0.5);
      }

      .item {
        flex: 1;
        height: 100px;

        >a {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          align-items: center;
          padding-top: 11px;
          text-decoration: none;
          color: #333;
          transition: all 0.2s;
          opacity: 0.5;

          .tab-icon {
            width: 47px;
            height: 47px;
            margin-bottom: 11px;

            .icon {
              width: 47px;
              height: 47px;
            }
          }

          .tab-text {
            text-align: center;
            line-height: 20px;
            font-size: 20px;
          }

          &.active {
            opacity: 1;
          }
        }
      }
    }
  }
</style>