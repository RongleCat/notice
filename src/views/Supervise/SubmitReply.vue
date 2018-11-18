<template>
  <div class="submit-container">
    <van-cell-group>
      <van-cell value="标题" />
      <van-cell>
        {{pd.title}}
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell value="内容" />
      <van-cell>
        {{pd.content}}
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
        <div class="file-item" v-for="(i,index) in images" :key="index" @click="viewImage(i)">
          <div class="main">
            <img :src="i">
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="开始时间" :value="pd.startTime|getTime|fTime('YYYY-MM-DD HH:mm')" />
      <van-cell title="结束时间" :value="pd.endTime|getTime|fTime('YYYY-MM-DD HH:mm')" />
    </van-cell-group>
    <van-cell-group>
      <van-cell value="反馈内容" />
      <van-field v-model="content" type="textarea" placeholder="请输入反馈内容" rows="1" autosize />
    </van-cell-group>
    <van-cell-group>
      <van-cell value="附件" />
      <van-cell class="submitfile-container">
        <div class="file-item" v-for="(i,index) in submitImages" :key="index" @click="viewImage(i)">
          <div class="main">
            <i class="iconfont icon-cha" @click.stop="submitImages.splice(index, 1)"></i>
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

    <div class="bottom-btn">
      <van-button size="large" @click="$router.replace('/supervise/myreply')">提交</van-button>
    </div>
  </div>
</template>

<script>
  import {
    Toast
  } from "vant";
  export default {
    data() {
      return {
        content: '',
        pd: null,
        submitImages: []
      }
    },
    beforeCreate() {
      document.title = '提交反馈'
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      images() {
        if (this.pd) {
          return this.pd.attachment.split('|')
        } else {
          return []
        }
      }
    },
    mounted() {
      let that = this
      that.$http.get('/api/WorkNotify/ReplyDetail2', {
        params: {
          id: that.id
        }
      }).then(r => {
        console.log(r);
        that.pd = r
      })
    },
    methods: {
      viewImage(url) {
        let that = this
        window.wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: that.submitImages // 需要预览的图片http链接列表
        });
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
                  that.submitImages.push('http://wibgchina.cnvp.com.cn' + r.replace('\\', '/'))
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
      submitReply(){
        let that = this
        that.$http.post('/api/WorkNotify/Reply',post).then(()=>{
          Toast('操作成功')
          console.log('操作成功');
        })
      }
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
        float: left;
        border-radius: 5px;
        padding: 10px;

        .main {
          width: 100%;
          padding-top: 100%;
          @include tapMask;
          overflow: hidden;
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

    .submitfile-container {
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
  }
</style>