<style>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<template>
  <div>
    <Row>
      <Col><p style="height: 80px"></p></Col>
    </Row>
    <Row type="flex" justify="space-around" align="top" class="code-row-bg">
      <Col span="8">
        <h2 style="text-align: center; margin-bottom: 10px">内测账号</h2>
        <Collapse style="margin: 0 auto" accordion>
          <Spin fix v-if="isLoadingAccountInfo">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>正在查询账户信息</div>
          </Spin>
          <Panel name="1">
            高一学生账号
            <Table slot="content" :columns="columns" :data="seniorOneStudentAccountData">
            </Table>
          </Panel>
          <Panel name="2">
            高二学生账号
            <Table slot="content" :columns="columns" :data="seniorTowStudentAccountData"></Table>
          </Panel>
          <Panel name="3">
            高三学生账号
            <Table slot="content" :columns="columns" :data="seniorThreeStudentAccountData"></Table>
          </Panel>
          <Panel name="4">
            教师账号
            <Table slot="content" :columns="teacherColumns" :data="teacherAccountData"></Table>
          </Panel>
          <Panel name="5">
            管理员账号
            <Table slot="content" :columns="adminColumns" :data="adminAccountData"></Table>
          </Panel>
        </Collapse>

      </Col>
      <Col span="8">
        <Card style="width:350px; margin: 0 auto;">
          <Spin fix v-if="autoLogining">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>正在尝试自动登录</div>
          </Spin>
          <Form ref="formValidate" :model="AccountInfo" :label-width="0">
            <h2 style="text-align: center; margin-bottom: 20px">欢迎登录IntelliSchool后台</h2>
            <FormItem label="" prop="account">
              <Input v-model="AccountInfo.account" placeholder="请输入账号"></Input>
            </FormItem>
            <FormItem label="" prop="password">
              <Input v-model="AccountInfo.password" type="password" placeholder="请输入密码"></Input>
            </FormItem>
            <Vcode :show="isShow" @success="success" @close="close"/>
            <FormItem style="margin-bottom: 0">
              <Button type="primary" @click="handleSubmit()" long>登录</Button>
              <div style="height: 10px"></div>
              <Button @click="handleReturnHome()" long>返回首页</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>

</template>
<script>
// import axios from "axios";
import Vcode from "vue-puzzle-vcode";
import global from "../js/global";
import Router from '../router'

export default {
  data() {
    return {
      AccountInfo: {
        account: '',
        password: '',
      },
      autoLogining: false,
      isLoadingAccountInfo: false,
      isShow: false, // 验证码模态框是否出现
      columns: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '账号',
          key: 'account'
        },
        {
          title: '密码',
          key: 'password'
        },
        {
          title: '类型',
          key: 'type',
          filters: [
            {
              label: '未分科',
              value: '未分科'
            },
            {
              label: '理科',
              value: '理科'
            },
            {
              label: '文科',
              value: '文科'
            }
          ],
          filterMethod(value, row) {
            return row.type.indexOf(value) > -1;
          }
        },
      ],
      teacherColumns: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '账号',
          key: 'account'
        },
        {
          title: '密码',
          key: 'password'
        },
        {
          title: '类型',
          key: 'type',
          filters: [
            {
              label: '教师',
              value: '教师'
            }
          ],
          filterMethod(value, row) {
            return row.type.indexOf(value) > -1;
          }
        },
      ],
      adminColumns: [
        {title: '账号', key: 'account'},
        {title: '密码', key: 'password'}
      ],
      adminAccountData: [],
      seniorOneStudentAccountData: [],
      seniorTowStudentAccountData: [],
      seniorThreeStudentAccountData: [],
      teacherAccountData: []
    }
  },
  components: {
    Vcode
  },
  methods: {
    getAllAccountList() {
      this.isLoadingAccountInfo = true
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/account/getAllAccountList',
        params: {}
      })
        .then((response) => {
          console.log(response)
          // 首先是高一学生
          for (let obj of response.data['高一学生账号']) {
            this.seniorOneStudentAccountData.push(obj)
          }
          for (let obj of response.data['高二学生账号']) {
            this.seniorTowStudentAccountData.push(obj)
          }
          for (let obj of response.data['高三学生账号']) {
            this.seniorThreeStudentAccountData.push(obj)
          }
          for (let obj of response.data['教师账号']) {
            this.teacherAccountData.push(obj)
          }
          for (let obj of response.data['管理员账号']) {
            this.adminAccountData.push(obj)
          }
          this.isLoadingAccountInfo = false
        })
        .catch((response) => {
          console.log(response)
        })
        .then((response) => {
        });
    },
    handleSubmit() {
      if (this.AccountInfo.account === '') {
        this.$Notice.warning({
          title: '请输入账号！'
        })
      }
      if (this.AccountInfo.password === '') {
        this.$Notice.warning({
          title: '请输入密码！'
        })
      }
      if (this.AccountInfo.account === '' || this.AccountInfo.password === '') {
        return
      }
      this.isShow = true;
    },
    handleReturnHome() {
      window.location.href = "http://www.intellischool.top";
    },
    success(msg) {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.login()
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
    login() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + 'account/login',
        params: this.AccountInfo
      })
        .then((response) => {
          console.log(response)
          if (response.data.ok) {
            this.$Notice.success({
              title: response.data.msg,
            });
            // 存入localStorage中
            window.localStorage.setItem("accountJWT", response.data.accountJWT)
            window.localStorage.setItem("deadline", response.data.deadline)
            window.localStorage.setItem("authority", response.data.authority)
            Router.push('/backstage/profile')
          } else {
            this.$Notice.error({
              title: response.data.msg,
            });
          }
        })
        .catch((response) => {
        })
        .then((response) => {
          console.log("running")
        });
    },
    autoLogin() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/account/existTheAccount',
        params: {
          "accountJWT": window.localStorage.getItem("accountJWT")
        }
      })
        .then((response) => {
          if (response.data) {
            Router.push('/backstage/profile')
          } else {
            window.localStorage.removeItem("accountJWT")
          }
        })
        .catch((response) => {
        })
        .then((response) => {
          this.autoLogining = false
        });
    },
    detectAccountJWT() {
      if (window.localStorage.getItem("accountJWT") == null || this.isOverdue()) {
        this.$Notice.warning({
          title: '账户凭证失效',
          desc: '请重新登录！'
        })
        Router.push("/login")
      }
    },
    isOverdue() {
      let deadline = new Date(window.localStorage.getItem("deadline").replace(/-/g, "/"));
      let currTime = new Date();
      console.log('deadline', deadline.getTime(), 'currTime', currTime.getTime())
      return deadline.getTime() < currTime.getTime()
    }
  },
  mounted() {
    if (window.localStorage.getItem("accountJWT") != null && !this.isOverdue()) {
      this.autoLogining = true
      this.autoLogin()
    }
    this.getAllAccountList()
  }
}
</script>
