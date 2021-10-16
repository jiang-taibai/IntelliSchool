<style scoped>
.demo-badge {
  width: 42px;
  height: 42px;
  background: #eee;
  border-radius: 6px;
  display: inline-block;
}
</style>
<template>
  <Menu mode="horizontal" theme="light" :active-name=actived>
    <MenuItem name="profile" @click.native="goto('profile')" v-if="isTeacher || isStudent || isAdmin">
      <Icon type="md-contact"/>
      我的信息
    </MenuItem>
    <MenuItem name="examEvaluation" @click.native="goto('examEvaluation')" v-if="isTeacher">
      <Icon type="ios-paper"/>
      考试评价
    </MenuItem>
    <MenuItem name="exams" @click.native="goto('exams')" v-if="isStudent">
      <Icon type="ios-paper"/>
      我的考试
    </MenuItem>
    <MenuItem name="feedback" @click.native="goto('feedback')" v-if="isStudent">
      <Icon type="ios-create"/>
      考试反馈
    </MenuItem>
    <MenuItem name="inform" @click.native="goto('inform')" v-if="isAdmin">
      <Icon type="md-at" />
      通知用户
    </MenuItem>
    <MenuItem name="message" @click.native="goto('message')" v-if="isTeacher || isStudent || isAdmin">
      <Badge :count="unreadCount" :offset="[20, -5]">
        <Icon type="md-mail"/>
        我的消息
      </Badge>
    </MenuItem>
    <MenuItem name="setting" @click.native="goto('setting')" v-if="isTeacher || isStudent || isAdmin">
      <Icon type="ios-build"/>
      设置中心
    </MenuItem>
    <div style="float: right; margin-right: 50px">
      <ButtonGroup size="default">
        <Button size="default" type="primary" @click="gotoHome">
          <Icon type="md-home"/>
          返回首页
        </Button>
        <Button size="default" type="primary" @click="logout">
          退出登录
          <Icon type="md-log-out"/>
        </Button>
      </ButtonGroup>
    </div>

  </Menu>
</template>
<script>
import Router from '../../../router'
import global from "../../../js/global";

export default {
  data() {
    return {
      unreadCount: null,
      userName: '',
      isTeacher: window.localStorage.getItem('authority') === 'teacher',
      isStudent: window.localStorage.getItem('authority') === 'student',
      isAdmin: window.localStorage.getItem('authority') === 'admin',
    }
  },
  props: {
    actived: String,
  },
  methods: {
    goto(name) {
      // console.log(name)
      this.$emit('goto', name)
    },
    gotoHome() {
      window.location.href = "http://www.intellischool.top";  // 这里等待项目部署完善
    },
    logout() {
      this.isLogin = false
      window.localStorage.removeItem("accountJWT")
      Router.push('/login')
    },
    getUnreadCount() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/menu/unreadCount',
        params: {
          'accountJWT': window.localStorage.getItem("accountJWT")
        }
      })
        .then((response) => {
          this.unreadCount = response.data
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    }
  },
  computed: {},
  mounted() {
    this.getUnreadCount()
  }

}
</script>
