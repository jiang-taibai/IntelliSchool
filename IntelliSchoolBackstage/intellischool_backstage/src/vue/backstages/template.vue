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
          <BreadcrumbItem>Profile</BreadcrumbItem>
        </Breadcrumb>

        <Card>
          <div style="min-height: 600px;"></div>
        </Card>

      </Content>
    </Layout>
  </div>
</template>

<script>
import MyMenu from './public/menu'
import Router from "../../router";

export default {
  name: "template",
  data() {
    return {

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
    }
  },
  mounted() {
    this.detectAccountJWT()
  }
}
</script>

<style scoped>

</style>
