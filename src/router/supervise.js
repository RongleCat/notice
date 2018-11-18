import Home from "../views/Supervise/Home.vue";
import MyRelease from "../views/Supervise/MyRelease.vue";
import MyReply from "../views/Supervise/MyReply.vue";
import CreateRelease from "../views/Supervise/CreateRelease.vue";
import ReleaseDetail from "../views/Supervise/ReleaseDetail.vue";
import ReplyDetail from "../views/Supervise/ReplyDetail.vue";
import SubmitReply from "../views/Supervise/SubmitReply.vue";

export default [
  {
    path: '/supervise/',
    name: 'superviseHome',
    component: Home
  }, {
    path: '/supervise/myrelease',
    name: 'superviseMyRelease',
    component: MyRelease
  }, {
    path: '/supervise/myreply',
    name: 'superviseMyReply',
    component: MyReply
  }, {
    path: '/supervise/createrelease',
    name: 'superviseCreateRelease',
    component: CreateRelease
  }, {
    path: '/supervise/releasedetail/:id',
    name: 'superviseReleaseDetail',
    component: ReleaseDetail
  }, {
    path: '/supervise/replydetail/:id',
    name: 'superviseReplyDetail',
    component: ReplyDetail
  }, {
    path: '/supervise/submitreply/:id',
    name: 'superviseSubmitReply',
    component: SubmitReply
  }
]