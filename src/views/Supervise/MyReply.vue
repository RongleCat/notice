<template>
  <div class="page" fabu>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <div class="item" @click="goDetali(i.State,i.Id)" v-for="(i,index) in list" :key="index">
        <van-panel :title="i.Title">
          <div class="item-content">
            {{i.Start | getTime | fTime('YYYY-MM-DD HH:mm')}} 至 {{i.End | getTime | fTime('YYYY-MM-DD HH:mm')}}
            <div class="state-label" :class="[stateItem(i.State).className]">{{stateItem(i.State).text}}</div>
          </div>
        </van-panel>
      </div>
    </van-list>
    <div class="no-data-list" v-if="!list.length">暂无数据</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        page: 0,
        loading: false,
        finished: false,
        list: [],
        listCount: 0
      }
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
        that.$http.get('/api/WorkNotify/MyReplies', {
          params: {
            page: that.page
          }
        }).then(r => {
          if (r) {
            that.listCount = r.total
            that.list = [...that.list, ...r.data]
            that.loading = false;
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
          text: state == 0 ? '未反馈' : state == 1 ? '已反馈' : '已关闭'
        }
      },
      goDetali(state, id) {
        if (state == 0) {
          this.$router.push('/supervise/submitreply/' + id)
        }
        //  else if (state == 1) {
        //   this.$router.push('/supervise/replydetail/' + id)
        // }
        else {
          this.$router.push('/supervise/replydetail/' + id)
        }
      }
    },
    beforeCreate() {
      document.title = '我的反馈'
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
          background: #f05e4b;
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