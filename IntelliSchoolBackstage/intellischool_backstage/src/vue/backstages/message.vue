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
      <MyMenu actived="message" @goto="goto"></MyMenu>
      <Content :style="{padding: '0px 50px 50px 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Backstage</BreadcrumbItem>
          <BreadcrumbItem>Message</BreadcrumbItem>
        </Breadcrumb>

        <Card>
          <div style="margin-bottom: 20px">
            <Button type="primary" @click="markAllAsRead">清除未读</Button>
          </div>
          <div style="min-height: 400px;">
            <Table stripe :columns="columns" :data="messages"></Table>
          </div>
          <Modal v-model="modal.isShow"
                 width="360"
                 :title="modal.message.title"
                 @on-cancel="receive">
            <p>{{ modal.message.desc }}</p>
            <div slot="footer">
              <Button type="success" size="large" long @click="receive">收到</Button>
            </div>
          </Modal>
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
  name: "message",
  data() {
    return {
      columns: [
        {
          title: '状态',
          key: 'state',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Tag', {
                props: {
                  color: params.row.markRead ? 'default' : 'warning',
                  size: "medium"
                },
              }, params.row.markRead ? '已读' : '未读')
            ]);
          }
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '时间',
          key: 'time',
          width: 250,
        },
        {
          title: '操作',
          key: 'operation',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.show(params.row)
                  }
                }
              }, '查看'),
            ]);
          }
        },
      ],
      messages: [
        // {
        //   title: '这是第一条通知',
        //   time: '2021.12.31 23:59:59',
        //   desc: '这是第一条通知的详细信息',
        //   markRead: false
        // },
      ],
      modal: {
        isShow: false,
        message: {}
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
    queryAllMessageByAccount() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/message/queryAllMessageByAccount',
        params: {
          'accountJWT': window.localStorage.getItem('accountJWT')
        }
      })
        .then((response) => {
          //List<MessageVO>
          let messages = []
          for (const obj of response.data) {
            messages.push({
              id: obj.messageId,
              title: obj.messageTitle,
              time: obj.messageCreateTimeString,
              desc: obj.messageDesc,
              markRead: obj.markRead === 1
            })
          }
          this.messages = messages;
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    show(obj) {
      this.modal.message = obj
      this.modal.isShow = true
    },
    receive() {
      this.modal.isShow = false
      // 这里需要对接API，表示该消息已读
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/message/markAsRead',
        params: {
          'messageId': this.modal.message.id,
          'accountJWT': window.localStorage.getItem('accountJWT')
        }
      })
        .then((response) => {
          if (response.data) {
            this.modal.message.markRead = true
            location.reload()
          } else {
            this.$Notice.warning({
              title: '标记已读状态失败。'
            })
          }
        })
        .catch((response) => {
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
    markAllAsRead() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/message/markAllAsRead',
        params: {
          'accountJWT': window.localStorage.getItem('accountJWT')
        }
      })
        .then((response) => {
          location.reload()
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    }
  },
  mounted() {
    this.detectAccountJWT()
    this.queryAllMessageByAccount()
  }
}
</script>

<style scoped>

</style>
