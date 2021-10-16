<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.infoUl {
  list-style: none;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <MyMenu actived="profile" @goto="goto"></MyMenu>
      <Content :style="{padding: '0px 50px 50px 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Backstage</BreadcrumbItem>
          <BreadcrumbItem>Profile</BreadcrumbItem>
        </Breadcrumb>

        <Card>
          <div style="min-height: 200px;">
            <Row type="flex" justify="start" align="top" class="code-row-bg" :gutter="16">
              <Col>
                <Card style="width:350px" v-if="!isAdmin">
                  <Spin size="large" fix v-if="infoLoading"></Spin>
                  <p slot="title">
                    <Icon type="ios-person"/>
                    基本信息
                  </p>
                  <a href="#" slot="extra" @click.prevent="showInputBox">
                    <Icon type="ios-loop-strong"></Icon>
                    信息有误？申请修改！
                  </a>
                  <CellGroup>
                    <Cell v-for="(info, index) in infos" :title=info.title :extra=info.value :key="index"></Cell>
                  </CellGroup>
                  <ul class="infoUl">
                  </ul>
                </Card>
              </Col>
              <Col>
                <Card style="width:350px">
                  <Spin size="large" fix v-if="accountInfosLoading"></Spin>
                  <p slot="title">
                    <Icon type="ios-person"/>
                    账户信息
                  </p>
                  <span slot="extra">
                    <Button type="primary" @click="changeAccountInfo" size="small"><Icon type="md-checkmark"/></Button>
                    <Button @click="recoverAccountInfo" size="small"><Icon type="md-refresh"/></Button>
                  </span>
                  <CellGroup>
                    <Cell v-for="(info, index) in accountInfos" :title=info.title :key="index">
                      <Input v-model=info.value slot="extra"/>
                    </Cell>
                  </CellGroup>
                  <ul class="infoUl">
                  </ul>
                </Card>
              </Col>
            </Row>
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
  name: "profile",
  data() {
    return {
      isAdmin: window.localStorage.getItem('authority') === 'admin',
      infoLoading: true,
      accountInfosLoading: true,
      infos: [],
      accountInfos: [],
      accountInfos_copy: [],
      feedbackContent: '',
    }
  },
  components: {
    MyMenu
  },
  methods: {
    initUserInfo() {
      let that = this
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/profile/getStudentUserInfo',
        params: {
          'accountJWT': window.localStorage.getItem("accountJWT"),
        }
      })
        .then((response) => {
          console.log(response.data)
          let map = response.data
          let infos = []
          let accountInfos = []
          for (let key in map) {
            if (key === '邮箱' || key === '电话') {
              accountInfos.push({
                title: key,
                value: String(map[key] ? map[key] : '')
              })
            } else {
              infos.push({
                title: key,
                value: String(map[key] ? map[key] : '暂无信息')
              })
            }
          }
          that.infos = JSON.parse(JSON.stringify(infos))
          that.accountInfos = JSON.parse(JSON.stringify(accountInfos))
          that.accountInfos_copy = JSON.parse(JSON.stringify(accountInfos))
          that.accountInfosLoading = false
          that.infoLoading = false
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    showInputBox() {
      this.$Modal.confirm({
        onOk: () => {
          // 这里写上反馈的API
          this.axios({
            method: 'get',
            url: global.IntelliSchoolUrlPrefix + '/backstage-api/profile/feedback',
            params: {
              'accountJWT': window.localStorage.getItem('accountJWT'),
              'context': this.feedbackContent,
            }
          })
            .then((response) => {
              // 最后提示反馈成功
              this.$Notice.success({
                title: '反馈成功',
                desc: '反馈信息成功，在管理员处理该反馈后，系统将通知您！'
              })
            })
            .catch((response) => {
            })
            .then((response) => {
            });
        },
        render: (h) => {
          return h('Input', {
            props: {
              value: this.feedbackContent,
              autofocus: true,
              placeholder: '请输入反馈内容，包含欲修改的条目，修改的原因等内容',
              type: "textarea",
              autosize: {minRows: 2, maxRows: 5}
            },
            on: {
              input: (val) => {
                this.feedbackContent = val;
              }
            }
          })
        },
      })
    },
    goto(name) {
      Router.push('/backstage/' + name)
    },
    recoverAccountInfo() {
      this.accountInfos = JSON.parse(JSON.stringify(this.accountInfos_copy));
    },
    changeAccountInfo() {
      if (this.accountInfosLoading) {
        this.$Notice.warning({
          title: '信息正在载入，请稍等~',
          desc: '如果一直在加载，请尝试刷新该页面。'
        })
        return;
      }
      let that = this;
      // 调用API
      this.axios({
        method: 'post',
        url: global.IntelliSchoolUrlPrefix + 'backstage-api/profile/changeUserInfo',
        params: {
          'accountJWT': window.localStorage.getItem("accountJWT"),
          'email': that.accountInfos[0].value,
          'phone': that.accountInfos[1].value
        }
      })
        .then((response) => {
          if (response.data.ok) {
            that.$Notice.success({
              title: '修改成功',
              desc: response.data.msg
            })
            this.accountInfos_copy = JSON.parse(JSON.stringify(this.accountInfos))
          } else {
            this.$Notice.warning({
              title: response.data.msg
            })
          }
        })
        .catch((response) => {
          that.$Notice.error({
            title: '未知错误！'
          })
        })
        .then((response) => {
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
      return deadline.getTime() < currTime.getTime()
    },
    feedback() {

    }
  },
  mounted() {
    this.detectAccountJWT()
    this.initUserInfo()
  }
}
</script>

<style scoped>

</style>
