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
      <MyMenu actived="exams" @goto="goto"></MyMenu>
      <Content :style="{padding: '0px 50px 50px 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Backstage</BreadcrumbItem>
          <BreadcrumbItem>Exams</BreadcrumbItem>
        </Breadcrumb>

        <Card>
          <div style="min-height: 200px;">
            <Spin fix v-if="!allIsRight">
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
            <Select v-model="exam" filterable style="max-width: 200px; margin-bottom: 20px"
                    @on-change="getScoreInfoByExamId">
              <Option v-for="exam in ExamList" :value="exam.value" :key="exam.value">{{ exam.label }}</Option>
            </Select>
            <Table stripe :columns="columns" :data="data"></Table>
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
  name: "exams",
  data() {
    return {
      allIsRight: false,
      ExamList: [
        {
          value: '-1',
          label: '正在加载中...'
        },
      ],
      exam: '-1',
      columns: [
        {
          title: '',
          key: 'Type'
        },
        {
          title: '语文',
          key: 'Chinese'
        },
        {
          title: '数学',
          key: 'Math'
        },
        {
          title: '英语',
          key: 'English'
        },
        {
          title: '物理',
          key: 'Physics'
        },
        {
          title: '化学',
          key: 'Chemistry'
        },
        {
          title: '生物',
          key: 'Biology'
        },
        {
          title: '政治',
          key: 'Politics'
        },
        {
          title: '历史',
          key: 'History'
        },
        {
          title: '地理',
          key: 'Geography'
        },
        {
          title: '总',
          key: 'Total'
        },
      ],
      data: [
        {
          Type: '考试分数',
          Chinese: -1,
          Math: -1,
          English: -1,
          Physics: -1,
          Chemistry: -1,
          Biology: -1,
          Politics: -1,
          History: -1,
          Geography: -1,
          Total: -1
        },
        {
          Type: '班级排名',
          Chinese: -1,
          Math: -1,
          English: -1,
          Physics: -1,
          Chemistry: -1,
          Biology: -1,
          Politics: -1,
          History: -1,
          Geography: -1,
          Total: -1
        },
        {
          Type: '校级排名',
          Chinese: -1,
          Math: -1,
          English: -1,
          Physics: -1,
          Chemistry: -1,
          Biology: -1,
          Politics: -1,
          History: -1,
          Geography: -1,
          Total: -1
        },
        {
          Type: '班级均分',
          Chinese: -1,
          Math: -1,
          English: -1,
          Physics: -1,
          Chemistry: -1,
          Biology: -1,
          Politics: -1,
          History: -1,
          Geography: -1,
          Total: -1
        },
        {
          Type: '校级均分',
          Chinese: -1,
          Math: -1,
          English: -1,
          Physics: -1,
          Chemistry: -1,
          Biology: -1,
          Politics: -1,
          History: -1,
          Geography: -1,
          Total: -1
        },
      ],
    }
  },
  components: {
    MyMenu
  },
  methods: {
    goto(name) {
      Router.push('/backstage/' + name)
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
          this.getScoreInfoByExamId()
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    getScoreInfoByExamId() {
      this.allIsRight = false
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/exams/scoreInfo',
        params: {
          'accountJWT': window.localStorage.getItem("accountJWT"),
          'examId': this.exam
        }
      })
        .then((response) => {
          let data = [{}, {}, {}, {}, {}]
          const orderName = ['考试分数', '班级排名', '校级排名', '班级均分', '校级均分']
          const fixeds = [1, 0, 0, 2, 2]
          for (const key in response.data) {
            const dataObj = response.data[key]
            const index = orderName.indexOf(key)
            const fixed = fixeds[index]
            console.log(dataObj)
            data[index] = {
              Type: key,
              Chinese: dataObj['chinese'] == null ? '-' : dataObj['chinese'].toFixed(fixed),
              Math: dataObj['math'] == null ? '-' : dataObj['math'].toFixed(fixed),
              English: dataObj['english'] == null ? '-' : dataObj['english'].toFixed(fixed),
              Physics: dataObj['physics'] == null ? '-' : dataObj['physics'].toFixed(fixed),
              Chemistry: dataObj['chemistry'] == null ? '-' : dataObj['chemistry'].toFixed(fixed),
              Biology: dataObj['biology'] == null ? '-' : dataObj['biology'].toFixed(fixed),
              Politics: dataObj['politics'] == null ? '-' : dataObj['politics'].toFixed(fixed),
              History: dataObj['history'] == null ? '-' : dataObj['history'].toFixed(fixed),
              Geography: dataObj['geography'] == null ? '-' : dataObj['geography'].toFixed(fixed),
              Total: dataObj['total'] == null ? '-' : dataObj['total'].toFixed(fixed)
            }
          }
          this.data = data;
          this.allIsRight = true
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
    }
  },
  computed: {},
  mounted() {
    this.detectAccountJWT()
    this.getExamListByStudentId()
  }
}
</script>

<style scoped>

</style>
