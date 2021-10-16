import Vue from 'vue'
import Router from 'vue-router'

import Login from '../vue/login'
const Profile = () => import("../vue/backstages/profile")
const Exams = () => import("../vue/backstages/exams")
const Feedback = () => import("../vue/backstages/feedback")
const Message = () => import("../vue/backstages/message")
const Setting = () => import("../vue/backstages/setting")
const ExamEvaluation = () => import("../vue/backstages/examEvaluation")
const Infrom = () => import('../vue/backstages/inform')

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/backstage/profile',
    component: Profile
  },
  {
    path: '/backstage/exams',
    component: Exams
  },
  {
    path: '/backstage/feedback',
    component: Feedback
  },
  {
    path: '/backstage/message',
    component: Message
  },
  {
    path: '/backstage/setting',
    component: Setting
  },
  {
    path: '/backstage/examEvaluation',
    component: ExamEvaluation
  },
  {
    path: '/backstage/inform',
    component: Infrom
  }
]

export default new Router({
  routes: routes,
  mode: "hash"
})
