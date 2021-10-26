package com.dajiangsai.service;

import com.dajiangsai.pojo.Student;
import com.dajiangsai.pojo.vo.ExamIdNameVO;
import com.dajiangsai.pojo.vo.StudentIdNameVO;
import com.dajiangsai.pojo.vo.TendencyVO;

import java.util.List;
import java.util.Map;

/**
 * <p>创建时间：2021/2/21 14:50</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public interface StudentDataService {

    /**
     * 查询某位学生的信息
     */
    public Student getStudentInfo(Integer studentId);

    /**
     * 查询某次考试某科有多少人参加考试
     */
    public Integer getNumberOfParticipants(Integer examId, Integer subjectId);

    /**
     * 查询某次考试中某人的各科校排名情况
     */
    public Map<String, Integer> getOneTestAllSubjectRankInSchool(Integer examId, Integer studentId);

    /**
     * 得到所有考试总分中的 班级均分与个人得分
     * key: 考试名称
     * value.key: 班级均分/个人总分
     * value.value: 值
     */
    public Map<String, Map<String, Double>> getAllTestTotalScore_ClassAvgScoreAndPersonaScore(Integer studentId);

    /**
     * 得到所有考试中个人校排名情况
     */
    public Map<String, Integer> getAllTestRankInSchool(Integer studentId);

    /**
     * 得到所有考试中某科目的个人校排名情况
     */
    public Map<String, Integer> getAllTestSomeSubjectRankInSchool(Integer studentId, Integer subjectId);

    /**
     * 得到所有时间段内个人消费总额
     * key: 时间字符串，格式可为yyyy-MM-dd
     * value: 某天消费的总额
     */
    public Map<String, Double> getTotalConsumeEachDay(Integer studentId);

    /**
     * 根据个人ID得到班级每日平均消费
     * key: 时间字符串，格式可为yyyy-MM-dd
     * value: 某天消费的总额
     */
    public Map<String, TendencyVO> getClassTotalConsumeEachDay(Integer studentId);

    /**
     * 根据个人ID得到他所拥有的考试ID与考试名称
     */
    public List<ExamIdNameVO> getAllExamByStudentId(Integer studentId);

    /**
     * 得到所有学生ID与名字
     */
    public List<StudentIdNameVO> getAllStudentIdNames();
}
