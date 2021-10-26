<template>
  <div class="layout">
    <Layout>
      <MyMenu actived="examEvaluation" @goto="goto"></MyMenu>
      <Content :style="{padding: '0px 50px 50px 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Backstage</BreadcrumbItem>
          <BreadcrumbItem>ExamEvaluation</BreadcrumbItem>
        </Breadcrumb>

        <Card>
          <div style="min-height: 200px;">
            <div style="display: flex; justify-items: center;">
              <Select v-model="gradeOption" style="max-width: 200px; margin-bottom: 20px; margin-right: 5px"
                      @on-change="changeGrade">
                <Option v-for="item in grades" :value="item.value" :key="item.value">
                  {{ item.label }}
                </Option>
              </Select>
              <Select v-model="classOption" style="max-width: 200px; margin-bottom: 20px; margin-right: 5px"
                      @on-change="changeClass">
                <Option v-for="classItem in classes" :value="classItem.value" :key="classItem.value">
                  {{ classItem.label }}
                </Option>
              </Select>
              <Select v-model="studentOption"
                      style="max-width: 200px; margin-bottom: 20px; margin-right: 5px"
                      @on-change="changeStudent">
                <Option v-for="studentItem in students" :value="studentItem.value" :key="studentItem.value">
                  {{ studentItem.label }}
                </Option>
              </Select>
              <Select v-model="examOption" style="max-width: 200px; margin-bottom: 20px; margin-right: 5px"
                      @on-change="changeExam">
                <Option v-for="examItem in exams" :value="examItem.value" :key="examItem.value">
                  {{ examItem.label }}
                </Option>
              </Select>
              <Button type="primary" @click="getScoreInfoByExamId">查询成绩</Button>
            </div>
            <div style="position: relative">
              <Spin fix v-if="isLoadingExamInfo">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
              </Spin>
              <Table stripe :columns="columns" :data="data"></Table>
            </div>


            <div style="padding: 25px 20px">
              <Breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>">
                <BreadcrumbItem>{{ getGradeName }}</BreadcrumbItem>
                <BreadcrumbItem>{{ getClassName }}</BreadcrumbItem>
                <BreadcrumbItem>{{ getStudentName }}</BreadcrumbItem>
                <BreadcrumbItem>{{ getExamName }}</BreadcrumbItem>
              </Breadcrumb>
              <div style="height: 10px"></div>
              <Input v-model="teacherEvaluation"
                     type="textarea"
                     :autosize="{minRows: 4}"
                     placeholder="请输入对改名学生的本次考试评价"
              />
              <div style="height: 10px"></div>
              <Button type="success" @click="teacherUpdateRemark" long>保存</Button>
              <div style="height: 10px"></div>
              <Input v-model="studentFeedback"
                     type="textarea"
                     :autosize="{minRows: 1}"
                     placeholder="该生尚未反馈"
                     disabled
              />
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

export default {
  name: "examEvaluation",
  data() {
    return {
      isLoadingExamInfo: false,
      gradeOption: 1,
      classOption: 220101,
      studentOption: 14715,
      examOption: 10000,
      grades: [
        {label: '高一', value: 1},
        {label: '高二', value: 2},
        {label: '高三', value: 3},
      ],
      classes: [],
      students: [],
      exams: [],
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
      remarkId: null,
      teacherEvaluation: '',
      studentFeedback: '',
    }
  },
  components: {
    MyMenu
  },
  methods: {
    goto(name) {
      Router.push('/backstage/' + name)
    },
    refreshAllClasses() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/teacher/examEvaluation/getAllClasses',
        params: {
          'gradeIndex': this.gradeOption
        }
      })
        .then((response) => {
          let classes = []
          for (const obj of response.data) {
            classes.push({
              label: obj.className,
              value: obj.classIndex
            })
          }
          this.classes = classes
          // 链式反应
          this.classOption = this.classes[0].value
          this.changeClass()
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    refreshAllStudents() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/teacher/examEvaluation/getAllStudents',
        params: {
          'classIndex': this.classOption
        }
      })
        .then((response) => {
          let students = []
          for (const obj of response.data) {
            students.push({
              label: obj.studentName,
              value: obj.studentIndex
            })
          }
          this.students = students
          // 链式反应
          this.studentOption = this.students[0].value
          this.changeStudent()
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    refreshAllExams() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/teacher/examEvaluation/getAllExams',
        params: {
          'studentIndex': this.studentOption
        }
      })
        .then((response) => {

          let exams = []
          for (const obj of response.data) {
            exams.push({
              label: obj.examName,
              value: obj.examIndex
            })
          }
          this.exams = exams
          // 链式反应
          this.examOption = this.exams[0].value
          this.changeExam()
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    getScoreInfoByExamId() {
      this.isLoadingExamInfo = true
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/teacher/examEvaluation/getScoreInfoByExamId',
        params: {
          'studentId': this.studentOption,
          'examId': this.examOption
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
          this.isLoadingExamInfo = false
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    getRemark() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/teacher/examEvaluation/getRemark',
        params: {
          'accountJWT': window.localStorage.getItem('accountJWT'),
          'examId': this.examOption,
          'studentId': this.studentOption
        }
      })
        .then((response) => {
          this.teacherEvaluation = response.data.remarkContent
          this.studentFeedback = response.data.studentFeedback
          this.remarkId = response.data.remarkId
        })
        .catch((response) => {
        })
        .then((response) => {
        });
    },
    teacherUpdateRemark() {
      this.axios({
        method: 'get',
        url: global.IntelliSchoolUrlPrefix + '/backstage-api/teacher/examEvaluation/teacherUpdateRemark',
        params: {
          "accountJWT": window.localStorage.getItem('accountJWT'),
          'remarkId': this.remarkId,
          'remarkContent': this.teacherEvaluation
        }
      })
        .then((response) => {
          if (response.data) {
            this.$Notice.success({
              title: '保存成功！'
            })
          } else {
            this.$Notice.error({
              title: '保存失败！请重试~'
            })
          }
        })
        .catch((response) => {
          this.$Notice.error({
            title: '保存失败！请重试~'
          })
        })
        .then((response) => {
        });
    },
    changeExam() {
      this.getRemark()
    },
    changeStudent() {
      this.refreshAllExams()
    },
    changeClass() {
      this.refreshAllStudents()
    },
    changeGrade() {
      this.refreshAllClasses()
    }
  },
  computed: {
    getGradeName() {
      for (const item of this.grades) {
        if (item.value === this.gradeOption) {
          return item.label
        }
      }
    },
    getClassName() {
      for (const item of this.classes) {
        if (item.value === this.classOption) {
          return item.label
        }
      }
    },
    getStudentName() {
      for (const item of this.students) {
        if (item.value === this.studentOption) {
          return item.label
        }
      }
    },
    getExamName() {
      for (const item of this.exams) {
        if (item.value === this.examOption) {
          return item.label
        }
      }
    },
  },
  mounted() {
    this.changeGrade()
    this.getScoreInfoByExamId()
    this.getRemark()
  }
}
</script>

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

.demo-breadcrumb-separator {
  color: #ff5500;
  padding: 0 5px;
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
