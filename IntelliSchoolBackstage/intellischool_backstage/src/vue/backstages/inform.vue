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
      <MyMenu actived="1" @goto="goto"></MyMenu>
      <Content :style="{padding: '0px 50px 50px 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Backstage</BreadcrumbItem>
          <BreadcrumbItem>Inform</BreadcrumbItem>
        </Breadcrumb>

        <Card>
          <div style="">
            <div style="margin-bottom: 20px">
              <Input v-model="accountId" placeholder="请输入要通知的账户ID" style="width: 200px"/>
              <Select v-model="titleOption" style="width:200px">
                <Option v-for="item in titleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" @click="inform">通知</Button>
            </div>

            <Input v-model="informContent" :autosize="{minRows: 5}" maxlength="1000" show-word-limit type="textarea"
                   placeholder="请输入通知内容"/>
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
  name: "inform",
  data() {
    return {
      accountId: '',
      titleOption: '用户反馈处理',
      titleList: [
        {label: '用户反馈处理', value: '用户反馈处理'},
        {label: '通知', value: '通知'},
      ],
      informContent: '',
    }
  },
  components: {
    MyMenu
  },
  methods: {
    goto(name) {
      Router.push('/backstage/' + name)
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
    inform() {
      if(this.accountId === '') {
        this.$Notice.error({
          title: '请输入要通知的账户ID'
        })
      }
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/inform/informUserANewMessage',
        params: {
          'adminJWT': window.localStorage.getItem('accountJWT'),
          'userId': this.accountId,
          'title': this.titleOption,
          'context': this.informContent
        }
      })
        .then((response) => {
          if(response.data) {
            this.$Notice.success({
              title: '通知成功'
            })
            this.informContent = ''
          } else {
            this.$Notice.error({
              title: '通知失败',
              desc: '可能是账户ID有误'
            })
          }
        })
        .catch((response) => {})
        .then((response) => {});
    }
  },
  mounted() {
    this.detectAccountJWT()
  }
}
</script>

<style scoped>

</style>
