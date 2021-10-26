package com.dajiangsai.service;

import com.dajiangsai.common.exception.EnumNotFoundException;
import com.dajiangsai.pojo.Student;
import com.dajiangsai.pojo.Teacher;
import com.dajiangsai.pojo.vo.TendencyVO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * <p>创建时间：2021/2/20 14:28</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public interface ClassDataService {

    /**
     * 得到某班某学科的老师信息
     */
    public Teacher getClassSubjectTeacherInfo(Integer classId, Integer subjectId);

    /**
     * 得到所有考试的所有学科的最高分、最低分、平均分的值
     * key: 学科名称
     * value: 成绩趋势的数组
     */
    public Map<String, ArrayList<TendencyVO>> getExamAllSubjectTendency(Integer classId);

    /**
     * 得到某次考试所有学科某班的分数分布
     * 值分别为 0-某科的最高分的人数
     */
    public Map<String, ArrayList<Integer>> getExamAllSubjectScoreDistribution(Integer examId, Integer classId) throws EnumNotFoundException;

    /**
     * 得到某次考试某班总分分数分布
     * 数组坐标为 总分/100。例如 120分为120/100=1，80分为80/100=0 等等
     */
    public ArrayList<Integer> getExamTotalScoreDistribution(Integer examId, Integer classId);

    /**
     * 得到某班所有时间段的消费金额最高值、最低值、平均值
     * key: 日期时间，格式可为 yyyy-MM-dd
     * value: 趋势 VO
     */
    public Map<String, TendencyVO> getConsumeTendency(Integer classId);

    /**
     * 得到某班所有时间段的消费总额
     * key: 日期时间
     * value: 消费总额
     */
    public Map<String, Double> getTotalConsume(Integer classId);

    /**
     * 得到班级基本信息，有班级ID、班级名称、班级人数、各科老师的ID、名字
     */
    public Map<String, Object> getClassBasicInfo(Integer classId);

    /**
     * 得到班级内所有学生的信息
     */
    public List<Student> getClassAllStudents(Integer classId);
}
