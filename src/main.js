import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import "./assets/util/vconsole";

import Vant from 'vant';
// import 'vant/lib/vant-css/index.css';
import 'vant/lib/index.css';

import moment from "moment";

Vue.use(Vant);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false



axios.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  // removePending(res.config);
  if (res.data.IsSuccess) {
    if (res.data.Code === 401) {
      let url = encodeURIComponent(window.location.href.split('#')[1])
      let appid = '1000015'
      let api = 'worknotify'
      if (/notice/.test(url)) {
        appid = '1000016'
        api = 'meeting'
      }
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwb380417e702d20f6&redirect_uri=http%3a%2f%2fwibgchina.cnvp.com.cn%2fapi%2f${api}%2flogin&response_type=code&scope=snsapi_userinfo&agentid=${appid}&state=${url}&connect_redirect=1#wechat_redirect`
    }
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
  return value.substring(6, len - 2)
})

Vue.filter('defaultHead', function (value) {
  if (!value) return 'https://fmcat-common-static.oss-cn-hangzhou.aliyuncs.com/images/default_head.jpg'
  return value
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')