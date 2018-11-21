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