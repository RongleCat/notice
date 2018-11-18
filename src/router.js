import Vue from 'vue'
import Router from 'vue-router'
import superviseRouter from "./router/supervise"
import noticeRouter from "./router/notice"
import signRouter from "./router/sign"

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    ...superviseRouter,
    ...noticeRouter,
    ...signRouter
  ]
})

export default router