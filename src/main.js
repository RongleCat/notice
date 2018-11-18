import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import "./assets/util/vconsole";

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

import moment from "moment";

Vue.use(Vant);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

let wx = window.wx
axios.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  // removePending(res.config);
  if (res.data.IsSuccess) {
    return res.data.Data
  } else {
    console.log(res.data.Message);
    return false
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.filter('fTime', function (value, format) {
  if (!value) return ''
  if (!format) return moment(value.length === 10 ? parseInt(value) * 1000 : parseInt(value)).format('YYYY-MM-DD HH:mm:ss')
  return moment(value.length === 10 ? parseInt(value) * 1000 : parseInt(value)).format(format)
})

Vue.filter('getTime', function (value) {
  if (!value) return ''
  let len = value.length
  return value.substring(6,len-2)
})

if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
  axios.get('/api/ticket/get').then(r => {
    if (r) {
      wx.config({
        beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wwb380417e702d20f6', // 必填，企业微信的corpID
        nonceStr: r.nonceStr,
        signature: r.signature,
        timestamp: r.timestamp,
        jsApiList: ['selectEnterpriseContact', 'previewImage', 'uploadImage', 'chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function () {
        new Vue({
          router,
          render: h => h(App),
        }).$mount('#app')
      })

      wx.error(function (res) {
        console.log(res);
      });
    }
  })
} else {
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}