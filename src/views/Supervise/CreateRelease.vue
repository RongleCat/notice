<template>
  <transition name="fade-in">
    <div class="create-container" v-if="getJs">
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
        <van-cell class="file-container">
          <div class="file-item" v-for="(i,index) in images" :key="index" @click="viewImage(i)">
            <div class="main">
              <i class="iconfont icon-cha" @click.stop="deleteImage(index)"></i>
              <img :src="i">
            </div>
          </div>
          <div class="file-item add-file" @click="selectImage">
            <div class="main">
              <i class="iconfont icon-fujian"></i>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="开始时间" is-link :value="formatStart" @click="showStartTime = true" />
        <van-cell title="结束时间" is-link :value="formatEnd" @click="showEndTime = true" />
      </van-cell-group>
      <van-cell-group>
        <van-cell value="人员选择" />
        <van-cell class="add-container">
          <div class="add-item" v-for="(item,index) in selectUsers" :key="index">
            <span @click="deleteMan(item.id,index)"><i class="iconfont icon-cha"></i></span>
            <img :src="item.avatar||'https://fmcat-common-static.oss-cn-hangzhou.aliyuncs.com/images/default_head.jpg'">
            <div class="name">{{item.name}}</div>
          </div>
          <div class="add-item add-man">
            <div class="main" @click="selectJoinMan"><i class="iconfont icon-jia"></i></div>
          </div>
        </van-cell>
      </van-cell-group>
      <div class="bottom-btn">
        <van-button size="large" @click="submitCreate">提交</van-button>
      </div>
      <van-popup v-model="showStartTime" position="bottom">
        <van-datetime-picker v-model="startDate" type="datetime" :minDate="new Date()" :maxDate="startMax" @confirm="startConfirm"
          @cancel="startCancel" />
      </van-popup>
      <van-popup v-model="showEndTime" position="bottom">
        <van-datetime-picker v-model="endDate" type="datetime" :minDate="endMin" @confirm="endConfirm" @cancel="endCancel" />
      </van-popup>
    </div>
  </transition>
</template>

<script>
  import moment from "moment";
  import {
    Toast
  } from "vant";
  export default {
    data() {
      return {
        title: "",
        content: "",
        showStartTime: false,
        startDate: null,
        startDone: false,
        showEndTime: false,
        endDate: null,
        endDone: false,
        selectUsers: [],
        selectUsersId: [],
        images: [],
        getJs: false
      };
    },
    computed: {
      formatStart() {
        if (this.startDone) {
          return moment(this.startDate).format("YYYY-MM-DD HH:mm");
        } else {
          return "请选择";
        }
      },
      formatEnd() {
        if (this.endDone) {
          return moment(this.endDate).format("YYYY-MM-DD HH:mm");
        } else {
          return "请选择";
        }
      },
      imagesString() {
        return this.images.join("|");
      },
      startMax() {
        if (this.endDone) {
          return this.endDate;
        } else {
          return moment()
            .add(10, "year")
            .toDate();
        }
      },
      endMin() {
        if (this.startDone) {
          return this.startDate;
        } else {
          return new Date();
        }
      }
    },
    mounted() {
      let that = this
      // that.getJs = true
      that.$http.get('/api/worknotify/ticket', {
        params: {
          url: encodeURIComponent(window.location.href.split('#')[0])
        }
      }).then(r => {
        if (r) {
          window.wx.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wwb380417e702d20f6', // 必填，企业微信的corpID
            nonceStr: r.nonceStr,
            signature: r.signature,
            timestamp: r.timestamp,
            jsApiList: ['selectEnterpriseContact', 'previewImage', 'uploadImage', 'chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });

          window.wx.ready(function () {
            that.getJs = true
          })

          window.wx.error(function (res) {
            console.log(res);
          });
        }
      })
    },
    methods: {
      startCancel() {
        this.startDate = null;
        this.startDone = false;
        this.showStartTime = false;
      },
      startConfirm(value) {
        this.startDone = true;
        this.showStartTime = false;
        this.startDate = value;
      },
      endCancel() {
        this.endDate = null;
        this.endDone = false;
        this.showEndTime = false;
      },
      endConfirm(value) {
        this.endDone = true;
        this.showEndTime = false;
        this.endDate = value;
      },
      //选择参与人员
      selectJoinMan() {
        let that = this;
        window.wx.invoke(
          "selectEnterpriseContact", {
            fromDepartmentId: 0, // 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
            mode: "multi", // 必填，选择模式，single表示单选，multi表示多选
            type: ["user"], // 必填，选择限制类型，指定department、user中的一个或者多个
            selectedUserIds: that.selectUsersId
          },
          function (res) {
            if (res.err_msg == "selectEnterpriseContact:ok") {
              if (typeof res.result == "string") {
                res.result = JSON.parse(res.result); //由于目前各个终端尚未完全兼容，需要开发者额外判断result类型以保证在各个终端的兼容性
              }
              var users = res.result.userList; // 已选的成员列表
              that.selectUsers = users;
              that.createUsersId(users);
            }
          }
        );
      },
      selectImage() {
        let that = this;
        window.wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。（注：用户进入拍照界面仍然可自由切换两种模式）
          success: function (selectres) {
            // var localIds = res.localIds; // 返回选定照片的本地ID列表，
            console.log(selectres);
            // andriod中localId可以作为img标签的src属性显示图片；
            // 而在IOS中需通过上面的接口getLocalImgData获取图片base64数据，从而用于img标签的显示
            window.wx.uploadImage({
              localId: selectres.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                console.log(serverId);
                Toast.loading('正在获取图片')
                that.$http.get("/api/file/upload?media=" + serverId).then(r => {
                  that.images.push('http://wibgchina.cnvp.com.cn' + r.replace('\\', '/'))
                  Toast.clear()
                });
              },
              fail(err) {
                console.log(err);
              }
            });
          }
        });
      },
      createUsersId(arr) {
        let that = this;
        that.selectUsersId = [];
        arr.map(item => {
          that.selectUsersId.push(item.id);
        });
      },
      deleteMan(id, index) {
        let that = this;
        if (that.selectUsers[index].id === id) {
          that.selectUsers.splice(index, 1);
          that.createUsersId(that.selectUsers);
        }
      },
      submitCreate() {
        let that = this;
        if (!that.title.length) {
          Toast.fail("标题不能为空！");
          return false;
        }
        if (!that.content.length) {
          Toast.fail("内容不能为空！");
          return false;
        }
        if (!that.startDone) {
          Toast.fail("请选择本次督办开始时间！");
          return false;
        }
        if (!that.endDone) {
          Toast.fail("请选择本次督办结束时间！");
          return false;
        }
        if (!that.selectUsersId.length) {
          Toast.fail("请选择参与督办的人员！");
          return false;
        }

        let post = {
          startTime: moment(that.startDate).format("YYYY-MM-DD HH:mm:ss"),
          endTime: moment(that.endDate).format("YYYY-MM-DD HH:mm:ss"),
          title: that.title,
          content: that.content,
          userList: that.selectUsers,
          attachment: that.images.join("|")
        };

        that.$http.post("/api/WorkNotify/Post", post).then(() => {
          Toast.success('发布成功！')
          setTimeout(() => {
            that.$router.replace('/supervise/myrelease')
          }, 2000);
        });
      },
      deleteImage(index) {
        this.images.splice(index, 1)
      },
      viewImage(url) {
        let that = this
        window.wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: that.images // 需要预览的图片http链接列表
        });
      }
    },
    beforeCreate() {
      document.title = "发布督办";
      this.getJs = true
    }
  };
</script>

<style scoped lang="scss">
  .create-container {
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
        float: left;
        border-radius: 5px;
        padding: 10px;

        &.add-file {
          .main {
            border: 1px solid #ccc;
            border-radius: 15px;
          }

          .iconfont {
            font-size: 64px;
            position: absolute;
            top: 50%;
            left: 50%;
            color: #ccc;
            transform: translate(-50%, -50%)
          }
        }

        .main {
          padding-top: 100%;
          width: 100%;
          @include tapMask;
          overflow: hidden;

          .icon-cha {
            display: block;
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, .5);
            color: #fff;
            text-align: center;
            line-height: 50px;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 24px;
            z-index: 100;
            border-radius: 0 15px 0 15px;
            @include tapColor;
          }
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          position: absolute;
          top: 0;
          left: 0;
          object-fit: cover;
        }
      }
    }

    // .file-item{
    //   width: 72px;
    //   height: 72px;
    // }

    .add-container {
      .add-item {
        width: 20%;
        float: left;
        height: 180px;
        margin-bottom: 20px;
        overflow: hidden;
        padding: 0 20px;
        padding-bottom: 60px;
        position: relative;
        padding-top: 15px;

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