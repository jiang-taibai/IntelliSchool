<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <MyMenu actived="setting" @goto="goto"></MyMenu>
      <Content :style="{padding: '0px 50px 50px 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Backstage</BreadcrumbItem>
          <BreadcrumbItem>Setting</BreadcrumbItem>
        </Breadcrumb>

        <Card>
          <div style="min-height: 400px;">
            <div>
              <i-switch v-model="messageInform" @on-change="setMessageInform"/>
              通过邮箱通知最新消息
            </div>
            <Card style="margin-top: 10px; width: 400px">
              <h2 style="text-align: center; margin-bottom: 10px">修改密码</h2>
              <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
                <FormItem prop="originalPassword">
                  <Input type="text" v-model="formCustom.originalPassword" placeholder="请输入原始密码"></Input>
                </FormItem>
                <FormItem prop="newPassword">
                  <Input type="text" v-model="formCustom.newPassword" placeholder="请输入新密码"></Input>
                </FormItem>
                <FormItem prop="checkPassword">
                  <Input type="text" v-model="formCustom.checkPassword" placeholder="请再次输入新密码"></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmit()" long>修改密码</Button>
                </FormItem>
              </Form>
            </Card>
          </div>


        </Card>

      </Content>
    </Layout>
  </div>
</template>

<script>
import MyMenu from './public/menu'
import Router from "../../router";
import global from "../../js/global";

export default {
  name: "setting",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        let reg = new RegExp("^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$")
        if (!reg.test(value)) {
          callback(new Error('包含数字,英文,字符中的两种以上，长度6-20'))
        }
        if (this.formCustom.checkPassword !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('checkPassword');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formCustom.newPassword) {
        callback(new Error('两次密码不匹配！'));
      } else {
        callback();
      }
    };

    return {
      messageInform: false, // 是否开启消息通知
      formCustom: {
        originalPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      ruleCustom: {
        newPassword: [
          {validator: validatePass, trigger: 'change'}
        ],
        checkPassword: [
          {validator: validatePassCheck, trigger: 'change'}
        ],
      }
    }
  },
  components: {
    MyMenu
  },
  methods: {
    goto(name) {
      Router.push('/backstage/' + name)
    },
    getMessageInform() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/setting/getMessageInform',
        params: {
          'accountJWT': window.localStorage.getItem('accountJWT')
        }
      })
        .then((response) => {
          this.messageInform = response.data
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    setMessageInform() {
      let that = this
      this.axios({
        method: 'post',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/setting/setMessageInform',
        params: {
          'accountJWT': window.localStorage.getItem('accountJWT'),
          'op': this.messageInform
        }
      })
        .then((response) => {
          if (response.data.ok) {
            this.$Notice.success({
              title: response.data.msg
            })
          } else {
            this.$Notice.warning({
              title: response.data.msg
            })
            that.messageInform = !that.messageInform
          }
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    getSettingInfo() {
      this.getMessageInform()
    },
    enableMessageNotification() {
      if (!this.existEmailAddress) {
        this.$Notice.error({
          title: '开启失败！',
          desc: '您当前尚未绑定邮箱，请绑定邮箱后重试。'
        })
        this.messageNotification = []
      }
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
      return deadline.getTime() < currTime.getTime()
    },
    handleSubmit() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/setting/modifyPassword',
        params: {
          'accountJWT': window.localStorage.getItem('accountJWT'),
          'originalPassword': this.formCustom.originalPassword,
          'newPassword': this.formCustom.newPassword
        }
      })
        .then((response) => {
          if(response.data) {
            this.$Notice.success({
              title: '修改成功！'
            })
          } else {
            this.$Notice.error({
              title: '修改失败！',
              desc: '原密码输入错误！'
            })
          }
        })
        .catch((response) => {})
        .then((response) => {});
    },
  },
  mounted() {
    this.detectAccountJWT()
    this.getSettingInfo()
  }
}
</script>

<style scoped>

</style>
