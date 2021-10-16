<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

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
  <div class="layout">
    <Layout>
      <MyMenu actived="feedback" @goto="goto"></MyMenu>
      <Content :style="{padding: '0px 50px 50px 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Backstage</BreadcrumbItem>
          <BreadcrumbItem>Feedback</BreadcrumbItem>
        </Breadcrumb>

        <Select v-model="exam" filterable style="max-width: 200px; margin-bottom: 20px" @on-change="changeExam">
          <Option v-for="exam in ExamList" :value="exam.value" :key="exam.value">{{ exam.label }}</Option>
        </Select>

        <Card>
          <div style="min-height: 200px;">
            <h3>我的反馈</h3>
            <div style="padding: 25px 20px">
              <Spin fix v-if="!allIsRight">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
              </Spin>
              <Input v-model="SelfFeedback.content"
                     type="textarea"
                     :autosize="{minRows: 4}"
                     placeholder="请输入该次测试的自我反馈信息"
              />
              <div style="height: 20px"></div>
              <Button type="success" @click="submitSelfContent">保存</Button>
            </div>

          </div>
        </Card>

        <Card style="margin-top: 20px">
          <div style="min-height: 200px;">
            <h3 style="margin-bottom: 25px">教师评价</h3>

            <div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap;">
              <Spin fix v-if="!allIsRight">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
              </Spin>
              <Card style="width:350px; margin: 10px" v-for="comment in comments" :key=comment.remarkId>
                <p slot="title">
                  {{ comment.teacherName }}老师
                  <span v-if="comment.subjectName !== null">[{{ comment.subjectName }}老师]</span>
                </p>
<!--                <span slot="extra">-->
<!--                  教师评分：{{ comment.remarkScore }} 分-->
<!--                </span>-->
                <div style="margin-bottom: 20px">
                  {{ comment.teacherRemark }}
                </div>
                <Input v-model=comment.studentFeedback
                       placeholder="请输入回复内容..."
                       type="textarea"
                       :autosize="{minRows: 1}"
                       :disabled=comment.isStudentReplySubmit
                /><br>
                <div style="height: 20px"></div>
                <Button type="primary" :disabled=comment.isStudentReplySubmit long @click="reply(comment)">回复</Button>
              </Card>


            </div>
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

let editor;

export default {
  name: "feedback",
  data() {
    return {
      ExamList: [
        {
          value: '10000',
          label: '高一第一次月考'
        },
        {
          value: '10003',
          label: '高一第二次月考'
        },
        {
          value: '10006',
          label: '高一第三次月考'
        },
        {
          value: '10009',
          label: '高一第四次月考'
        }
      ],
      exam: '10000',
      SelfFeedback: {
        feedbackId: '',
        content: '',
      },
      value: '',
      comments: [],
      allIsRight: false
    }
  },
  components: {
    MyMenu,
  },
  methods: {
    goto(name) {
      Router.push('/backstage/' + name)
    },
    queryStudentSelfFeedback() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/feedback/queryStudentSelfFeedback',
        params: {
          'accountJWT': window.localStorage.getItem("accountJWT"),
          'examId': this.exam
        }
      })
        .then((response) => {
          console.log(response.data)
          this.SelfFeedback.feedbackId = response.data['feedbackId']
          this.SelfFeedback.content = response.data['content']
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    changeExam() {
      this.queryStudentSelfFeedback()
      this.queryAllRemarks()
    },
    getExamListByStudentId() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/exams/examList',
        params: {
          'accountJWT': window.localStorage.getItem("accountJWT")
        }
      })
        .then((response) => {
          let ExamList = []
          for (const perObj of response.data) {
            ExamList.push({
              value: perObj["examId"],
              label: perObj["examName"]
            })
          }
          this.ExamList = ExamList
          this.exam = response.data[0]['examId']
          this.changeExam()
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    queryAllRemarks() {
      this.allIsRight = false
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/feedback/queryAllRemarks',
        params: {
          'accountJWT': window.localStorage.getItem("accountJWT"),
          'examId': this.exam
        }
      })
        .then((response) => {
          console.log(response.data)
          let comments = []
          console.log(response.data)
          for (const obj of response.data) {
            if (obj.teacherRemark == null) continue
            comments.push({
              teacherName: obj['teacherName'],
              subjectName: obj['subjectName'],
              // remarkScore: obj['remarkScore'],
              teacherRemark: obj['teacherRemark'],
              studentFeedback: obj['studentFeedback'],
              isStudentReplySubmit: obj['studentFeedback'] != null && obj['studentFeedback'] !== '',
              remarkId: obj['id'],
              teacherId: obj['teacherId']
            })
          }
          this.comments = comments
          this.allIsRight = true
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    reply(comment) {
      console.log(comment)
      // 实现API，回复教师评论，并修改isStudentReplySubmit
      // 当然得先检查是否有内容
      if (comment.studentReply === '') {
        this.$Notice.warning({
          title: '回复失败！',
          desc: '请输入回复内容再提交吧~'
        })
        return;
      }
      this.axios({
        method: 'post',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/feedback/studentReplyRemark',
        params: {
          'accountJWT': window.localStorage.getItem("accountJWT"),
          'remarkId': comment.remarkId,
          'reply': comment.studentFeedback
        }
      })
        .then((response) => {
          // 返回boolean值
          if (response.data) {
            comment.isStudentReplySubmit = true
            this.$Notice.success({
              title: '回复成功！'
            })
          } else {
            this.$Notice.error({
              title: '回复失败！请稍后重试~'
            })
          }
        })
        .catch((response) => {
        })
        .then((response) => {
        });


    },
    submitSelfContent() {
      console.log(this.SelfFeedback)
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/feedback/updateStudentSelfFeedback',
        params: {
          'accountJWT': window.localStorage.getItem('accountJWT'),
          'feedbackId': this.SelfFeedback.feedbackId,
          'content': this.SelfFeedback.content
        }
      })
        .then((response) => {
          if (response.data) {
            this.$Notice.success({
              title: '保存成功！'
            })
          } else {
            this.$Notice.error({
              title: '保存失败！请稍后重试~'
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
      console.log('deadline', deadline.getTime(), 'currTime', currTime.getTime())
      return deadline.getTime() < currTime.getTime()
    }
  },
  mounted() {
    this.detectAccountJWT()
    this.getExamListByStudentId()
  }
}
</script>

<style scoped>

</style>
