package com.dajiangsai.controller;

import com.dajiangsai.pojo.Student;
import com.dajiangsai.pojo.vo.ExamIdNameVO;
import com.dajiangsai.pojo.vo.StudentIdNameVO;
import com.dajiangsai.pojo.vo.TendencyVO;
import com.dajiangsai.service.StudentDataService;
import com.dajiangsai.service.impl.StudentDataServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * <p>创建时间：2021/2/21 17:21</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@RestController
@RequestMapping("/studentData")
@Api(value = "学生数据API")
public class StudentDataController {

    @Autowired
    private StudentDataService studentDataService;

    /**
     * 查询某位学生的信息
     *
     * @param studentId
     */
    @GetMapping("/getStudentInfo")
    @ApiOperation(value = "查询某位学生的信息", notes = "按学号ID查询某位学生的信息")
    public Student getStudentInfo(Integer studentId) {
        return studentDataService.getStudentInfo(studentId);
    }

    /**
     * 查询某次考试某科有多少人参加考试
     */
    @GetMapping("/getNumberOfParticipants")
    @ApiOperation(value = "查询应考人数", notes = "查询某次考试某科有多少人参加考试")
    public Integer getNumberOfParticipants(Integer examId, Integer subjectId) {
        return studentDataService.getNumberOfParticipants(examId, subjectId);
    }

    /**
     * 查询某次考试中某人的各科校排名情况
     */
    @GetMapping("/getOneTestAllSubjectRankInSchool")
    @ApiOperation(value = "查询某次考试中某人的各科校排名情况", notes = "查询某次考试中某人的各科校排名情况")
    public Map<String, Integer> getOneTestAllSubjectRankInSchool(Integer examId, Integer studentId) {
        return studentDataService.getOneTestAllSubjectRankInSchool(examId, studentId);
    }

    /**
     * 得到所有考试总分中的 班级均分与个人得分
     * key: 考试名称
     * value.key: 班级均分/个人总分
     * value.value: 值
     */
    @GetMapping("/getAllTestTotalScore_ClassAvgScoreAndPersonaScore")
    @ApiOperation(value = "得到所有考试总分中的 班级均分与个人得分",
            notes = "key: 考试名称, value.key: 班级均分/个人总分, value.value: 值")
    public Map<String, Map<String, Double>> getAllTestTotalScore_ClassAvgScoreAndPersonaScore(Integer studentId) {
        return studentDataService.getAllTestTotalScore_ClassAvgScoreAndPersonaScore(studentId);
    }

    /**
     * 得到所有考试中个人校排名情况
     */
    @GetMapping("/getAllTestRankInSchool")
    @ApiOperation(value = "得到所有考试中个人校排名情况", notes = "")
    public Map<String, Integer> getAllTestRankInSchool(Integer studentId) {
        return studentDataService.getAllTestRankInSchool(studentId);
    }

    /**
     * 得到所有考试中某科目的个人校排名情况
     */
    @GetMapping("/getAllTestSomeSubjectRankInSchool")
    @ApiOperation(value = "得到所有考试中某科目的个人校排名情况", notes = "")
    public Map<String, Integer> getAllTestSomeSubjectRankInSchool(Integer studentId, Integer subjectId) {
        return studentDataService.getAllTestSomeSubjectRankInSchool(studentId, subjectId);
    }

    /**
     * 得到所有时间段内个人消费总额
     * key: 时间字符串，格式可为yyyy-MM-dd
     * value: 某天消费的总额
     */
    @GetMapping("/getTotalConsumeEachDay")
    @ApiOperation(value = "得到所有时间段内个人消费总额", notes = "key: 时间字符串，格式可为yyyy-MM-dd, value: 某天消费的总额")
    public Map<String, Double> getTotalConsumeEachDay(Integer studentId) {
        return studentDataService.getTotalConsumeEachDay(studentId);
    }

    /**
     * 根据个人ID得到班级每日平均消费
     * key: 时间字符串，格式可为yyyy-MM-dd
     * value: 某天班级消费的信息
     */
    @GetMapping("/getClassTotalConsumeEachDay")
    @ApiOperation(value = "得到所有时间段内某人的班级消费信息",
            notes = "key: 时间字符串，格式可为yyyy-MM-dd, value: 某天班级消费的信息")
    public Map<String, TendencyVO> getClassTotalConsumeEachDay(Integer studentId) {
        return studentDataService.getClassTotalConsumeEachDay(studentId);
    }

    /**
     * 根据个人ID得到他所拥有的考试ID与考试名称
     * key: 考试ID
     * value: 考试名称
     */
    @GetMapping("/getAllExamByStudentId")
    @ApiOperation(value = "根据学号得到某人的所有考试名称与考试ID", notes = "返回类型为ExamIdNameVO对象的数组")
    public List<ExamIdNameVO> getAllExamByStudentId(Integer studentId) {
        return studentDataService.getAllExamByStudentId(studentId);
    }

    /**
     * 得到所有学生ID与名字
     */
    @GetMapping("/getAllStudentIdNames")
    @ApiOperation(value = "得到所有学生ID与名字的对象数组")
    public List<StudentIdNameVO> getAllStudentIdNames() {
        return studentDataService.getAllStudentIdNames();
    }
}
