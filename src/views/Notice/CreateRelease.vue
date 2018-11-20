<template>
  <div class="create-container">
    <van-cell-group>
      <van-cell value="标题" />
      <van-field v-model="title" type="textarea" placeholder="请输入标题" rows="1" autosize />
    </van-cell-group>
    <van-cell-group>
      <van-cell value="内容" />
      <van-field v-model="content" type="textarea" placeholder="请输入内容" rows="1" autosize />
    </van-cell-group>
    <van-cell-group>
      <van-cell value="附件" />
      <van-cell>
        <div class="add-file" @click="selectImage">
          <i class="iconfont icon-fujian"></i>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="开始时间" is-link :value="formatMeeting" @click="showMeetingTime = true" />
    </van-cell-group>
    <van-cell-group>
      <van-cell value="人员选择" />
      <van-cell class="add-container">
        <div class="add-item" v-for="i in 9" :key="i">
          <span><i class="iconfont icon-cha"></i></span>
          <img src="https://bobtestimg.oss-cn-hangzhou.aliyuncs.com/images/1.jpg">
          <div class="name">曹铁柱说是</div>
        </div>
        <div class="add-item add-man">
          <div class="main" @click="selectJoinMan"><i class="iconfont icon-jia"></i></div>
        </div>
      </van-cell>
    </van-cell-group>
    <div class="bottom-btn">
      <van-button size="large" @click="$router.replace('/notice/releasedetail/100?state=0')">提交</van-button>
    </div>
    <van-popup v-model="showMeetingTime" position="bottom">
      <van-datetime-picker v-model="meetingDate" :min-date="new Date()" type="datetime" @confirm="meetingConfirm"
        @cancel="meetingCancel" />
    </van-popup>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    data() {
      return {
        title: "",
        content: "",
        showMeetingTime: false,
        meetingDate: null,
        meetingDone: false
      };
    },
    computed: {
      formatMeeting() {
        if (this.meetingDone) {
          return moment(this.meetingDate).format("YYYY-MM-DD HH:mm");
        } else {
          return "请选择";
        }
      }
    },
    methods: {
      meetingCancel() {
        this.meetingDate = null;
        this.meetingDone = false;
        this.showMeetingTime = false;
      },
      meetingConfirm(value) {
        this.meetingDone = true;
        this.showMeetingTime = false;
        this.meetingDate = value;
      },
      selectJoinMan() {
        window.wx.invoke(
          "selectEnterpriseContact", {
            fromDepartmentId: -1, // 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
            mode: "multi", // 必填，选择模式，single表示单选，multi表示多选
            type: ["department", "user"], // 必填，选择限制类型，指定department、user中的一个或者多个
            selectedDepartmentIds: ["2", "3"], // 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
            selectedUserIds: ["lisi", "lisi2"] // 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
          },
          function (res) {
            if (res.err_msg == "selectEnterpriseContact:ok") {
              if (typeof res.result == "string") {
                res.result = JSON.parse(res.result); //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
              }
            }
          }
        );
      },
      selectImage() {
        window.wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
          success: function (res) {
            // var localIds = res.localIds; // 返回选定照片的本地ID列表，
            console.log(res);
            // andriod中localId可以作为img标签的src属性显示图片；
            // 而在IOS中需通过上面的接口getLocalImgData获取图片base64数据，从而用于img标签的显示
          }
        });
      }
    },
    beforeCreate() {
      document.title = "发布督办";
    }
  };
</script>

<style scoped lang="scss">
  .create-container {
    padding: 30px 0;

    .van-cell-group {
      margin-bottom: 30px;
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

    .add-container {

      .add-item {
        width: 20%;
        float: left;
        height: 180px;
        padding: 0 20px;
        padding-bottom: 60px;
        position: relative;
        padding-top: 15px;
        margin-bottom: 20px;
        overflow: hidden;

        >span {
          display: block;
          width: 30px;
          height: 30px;
          color: #fff;
          background: #333;
          line-height: 30px;
          text-align: center;
          border-radius: 50%;
          position: absolute;
          right: 5px;
          top: 0;
          @include tapColor;

          i {
            font-size: 16px;
          }
        }

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

        &.add-man {
          .main {
            width: 100%;
            padding-top: 100%;
            position: relative;
          }

          i {
            top: 0;
            left: 0;
            border: 1px solid #ccc;
            display: block;
            width: 100%;
            height: 100%;
            color: #ccc;
            font-size: 56px;
            line-height: 100px;
            text-align: center;
            border-radius: 15px;
            @include tapMask;
            position: absolute;
            overflow: hidden;
          }
        }
      }
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