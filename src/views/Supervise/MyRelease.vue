<template>
  <div class="page" fabu>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="item" @click="$router.push('/supervise/releasedetail/'+i.Id+'?state='+i.State)" v-for="(i,index) in list" :key="index">
        <van-panel :title="i.Title">
          <div class="item-content">
            {{i.StartTime | getTime | fTime('YYYY-MM-DD HH:mm')}} 至 {{i.EndTime | getTime | fTime('YYYY-MM-DD HH:mm')}}
            <div class="state-label" :class="[stateItem(i.State).className]">{{stateItem(i.State).text}}</div>
          </div>
        </van-panel>
      </div>
    </van-list>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        page: 0,
        loading: false,
        finished: true,
        list: [],
        listCount: 0
      }
    },
    beforeCreate() {
      document.title = '我的发布'
    },
    mounted() {
      let that = this
      that.getListData()
    },
    methods: {
      onLoad() {
        if (!this.finished) {
          this.page += 1
          this.getListData()
        }
      },
      getListData() {
        let that = this
        that.$http.get('/api/WorkNotify/MyWorkNotify', {
          params: {
            page: that.page
          }
        }).then(r => {
          if (r) {
            that.listCount = r.total
            that.list = [...that.list, ...r.data]
            that.loading = false;
            if (that.page === 0) {
              that.finished = false
            }
            if (that.list.length >= that.listCount) {
              that.finished = true;
            }
            console.log(r);
          }
        })
      },
      stateItem(state) {
        return {
          className: state != 0 ? 'end' : '',
          text: state == 0 ? '未完成' : state == 1 ? '已完成' : '已关闭'
        }
      }
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