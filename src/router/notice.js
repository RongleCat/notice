import Home from "../views/Notice/Home.vue";
import MyRelease from "../views/Notice/MyRelease.vue";
import MyReply from "../views/Notice/MyReply.vue";
import CreateRelease from "../views/Notice/CreateRelease.vue";
import ReleaseDetail from "../views/Notice/ReleaseDetail.vue";
import ReplyDetail from "../views/Notice/ReplyDetail.vue";
import SubmitReply from "../views/Notice/SubmitReply.vue";
import SginResult from "../views/Notice/SginResult.vue";

export default [{
  path: '/notice/',
  name: 'noticeHome',
  component: Home
}, {
  path: '/notice/myrelease',
  name: 'noticeMyRelease',
  component: MyRelease
}, {
  path: '/notice/myreply',
  name: 'noticeMyReply',
  component: MyReply
}, {
  path: '/notice/createrelease',
  name: 'noticeCreateRelease',
  component: CreateRelease
}, {
  path: '/notice/releasedetail/:id',
  name: 'noticeReleaseDetail',
  component: ReleaseDetail
}, {
  path: '/notice/replydetail/:id',
  name: 'noticeReplyDetail',
  component: ReplyDetail
}, {
  path: '/notice/submitreply/:id',
  name: 'noticeSubmitReply',
  component: SubmitReply
}, {
  path: '/notice/sginresult/:id',
  name: 'noticeSginResult',
  component: SginResult
}]