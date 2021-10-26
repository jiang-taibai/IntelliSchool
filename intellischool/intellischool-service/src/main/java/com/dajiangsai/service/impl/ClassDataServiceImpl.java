package com.dajiangsai.service.impl;

import com.dajiangsai.common.enums.SubjectEnum;
import com.dajiangsai.common.exception.EnumNotFoundException;
import com.dajiangsai.common.utils.DateUtil;
import com.dajiangsai.mapper.*;
import com.dajiangsai.pojo.Consume;
import com.dajiangsai.pojo.Exam;
import com.dajiangsai.pojo.Student;
import com.dajiangsai.pojo.Teacher;
import com.dajiangsai.pojo.vo.ScoreInfoVO;
import com.dajiangsai.pojo.vo.TendencyVO;
import com.dajiangsai.service.ClassDataService;
import javafx.scene.input.InputMethodTextRun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * <p>创建时间：2021/2/20 15:13</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Service
public class ClassDataServiceImpl implements ClassDataService {

    @Autowired
    private TeacherMapper teacherMapper;
    @Autowired
    private ScoreMapper scoreMapper;
    @Autowired
    private ScoreRankMapper scoreRankMapper;
    @Autowired
    private ExamMapper examMapper;
    @Autowired
    private ConsumeMapper consumeMapper;
    @Autowired
    private StudentMapper studentMapper;

    /**
     * 得到某班某学科的老师信息
     *
     * @param classId
     * @param subjectId
     */
    @Override
    public Teacher getClassSubjectTeacherInfo(Integer classId, Integer subjectId) {
        Teacher teacher = new Teacher();
        teacher.setClassId(classId);
        teacher.setSubId(subjectId);
        return teacherMapper.selectOne(teacher);
    }

    /**
     * 得到所有考试的所有学科的最高分、最低分、平均分的值
     * key: 学科名称
     * value: 成绩趋势的数组
     *
     * @param classId
     */
    @Override
    public Map<String, ArrayList<TendencyVO>> getExamAllSubjectTendency(Integer classId) {
        Map<String, ArrayList<TendencyVO>> res = new HashMap<>();
        Map<String, Object> queryRankInClassMap = new HashMap<>();
        queryRankInClassMap.put("class_id", classId);
        // 循环每一个学科
        for (SubjectEnum subjectEnum : SubjectEnum.values()) {
            res.put(subjectEnum.name, new ArrayList<>());
            queryRankInClassMap.put("exam_subject", subjectEnum.val);
            List<Exam> exams = examMapper.queryClassAllExam(classId);
            // 循环每一门考试
            for (Exam exam : exams) {
                if (exam.getExamSubject() != subjectEnum.val) continue;
                queryRankInClassMap.put("exam_id", exam.getExamId());
                List<ScoreInfoVO> scoreInfos = scoreRankMapper.queryRankInClass(queryRankInClassMap);
                Double totalScore = 0.0;
                Double maxScore = 0.0;
                Double minScore = 150.0;
                // 循环每一个人的成绩
                for (ScoreInfoVO scoreInfoVO : scoreInfos) {
                    Double score = scoreInfoVO.getExam_score();
                    totalScore += score;
                    maxScore = Math.max(maxScore, score);
                    minScore = Math.min(minScore, score);
                }
                // 构造趋势 VO
                TendencyVO tendencyVO = new TendencyVO();
                tendencyVO.setMax(maxScore);
                tendencyVO.setMin(minScore);
                tendencyVO.setAvg(totalScore / scoreInfos.size());
                // 载入到map中
                ArrayList<TendencyVO> tendencyVOList = res.get(subjectEnum.name);
                tendencyVOList.add(tendencyVO);
                res.put(subjectEnum.name, tendencyVOList);
            }
        }
        return res;
    }

    /**
     * 得到某次考试所有学科某班的分数分布
     * 值分别为 0-某科的最高分的人数
     *
     * @param examId
     * @param classId
     */
    @Override
    public Map<String, ArrayList<Integer>> getExamAllSubjectScoreDistribution(Integer examId, Integer classId)
            throws EnumNotFoundException {
        Map<String, ArrayList<Integer>> res = new HashMap<>();
        for (SubjectEnum subjectEnum : SubjectEnum.values()) {
            int[] count = new int[(subjectEnum.score + 1) * 2];
            Map<String, Object> queryRankInClassMap = new HashMap<>();
            queryRankInClassMap.put("class_id", classId);
            queryRankInClassMap.put("exam_subject", subjectEnum.val);
            queryRankInClassMap.put("exam_id", examId);
            // 得到该班学生本次考试指定学科的所有成绩
            List<ScoreInfoVO> scoreInfos = scoreRankMapper.queryRankInClass(queryRankInClassMap);
            scoreInfos.forEach(scoreInfo -> {
                int index = (int) (scoreInfo.getExam_score() * 2);
                count[index]++;
            });
            ArrayList<Integer> resSon = new ArrayList<>();
            Arrays.stream(count).forEach(resSon::add);
            res.put(subjectEnum.name, resSon);
        }
        return res;
    }

    /**
     * 得到某次考试某班总分分数分布
     * 数组坐标为 总分/100。例如 120分为120/100=1，80分为80/100=0 等等
     * get a test of a class total score distribution
     * index of array equal divide the total score by 100, for example, 120 equal 120/100=1, 80 equal 80/100=0 and so on
     *
     * @param examId
     * @param classId
     */
    @Override
    public ArrayList<Integer> getExamTotalScoreDistribution(Integer examId, Integer classId) {
        // 使用数组存储所有总分出现的次数
        // use the array to save all of the total score frequency of occurrence
        int[] count = new int[11];
        // the map to save the total score for each student
        Map<Integer, Double> totalScoreMap = new HashMap<>();
        Map<String, Object> queryRankInClassMap = new HashMap<>();
        queryRankInClassMap.put("class_id", classId);
        queryRankInClassMap.put("exam_id", examId);
        for (SubjectEnum subjectEnum : SubjectEnum.values()) {
            queryRankInClassMap.put("exam_subject", subjectEnum.val);
            List<ScoreInfoVO> scoreInfos = scoreRankMapper.queryRankInClass(queryRankInClassMap);
            scoreInfos.forEach(scoreInfo -> {
                Integer studentId = scoreInfo.getStu_id();
                Double score = scoreInfo.getExam_score();
                totalScoreMap.put(studentId, totalScoreMap.getOrDefault(studentId, 0.0) + score);
            });
        }
        for (Map.Entry<Integer, Double> entry : totalScoreMap.entrySet()) {
            count[(int) (entry.getValue() / 100)]++;
        }

        ArrayList<Integer> res = new ArrayList<Integer>();
        Arrays.stream(count).forEach(res::add);
        return res;
    }

    /**
     * 得到某班所有时间段的消费金额最高值、最低值、平均值
     * key: 日期时间，格式可为 yyyy-MM-dd
     * value: 趋势 VO
     *
     * @param classId
     */
    @Override
    public Map<String, TendencyVO> getConsumeTendency(Integer classId) {
        Map<String, TendencyVO> res = new LinkedHashMap<>();
        List<Consume> aClassConsume = consumeMapper.queryAClassConsume(classId);
        // to save the sum of consumption some day
        Map<String, Double> dailyTotalConsume = new LinkedHashMap<>();
        Map<String, Map<Integer, Double>> dailyConsumeEachStudent = new LinkedHashMap<>();
        // sum of student who consume in some day should be constant value -> class size
        Student student = new Student();
        student.setClassId(classId);
        Integer classSize = studentMapper.selectCount(student);
        aClassConsume.forEach(consume -> {
            String consumeTime = DateUtil.getString(consume.getContime(), DateUtil.yyyyMMdd_dash);
            Double consumeMoney = consume.getConmoney();
            Integer studentId = consume.getStuId();
            Map<Integer, Double> someDayConsumeEachStudent = dailyConsumeEachStudent.getOrDefault(consumeTime, new HashMap<>());
            someDayConsumeEachStudent.put(studentId,
                    someDayConsumeEachStudent.getOrDefault(studentId, 0.0) + consumeMoney);
            dailyConsumeEachStudent.put(consumeTime, someDayConsumeEachStudent);
            dailyTotalConsume.put(consumeTime,
                    dailyTotalConsume.getOrDefault(consumeTime, 0.0) + consumeMoney);
        });

        for (Map.Entry<String, Map<Integer, Double>> entry : dailyConsumeEachStudent.entrySet()) {
            TendencyVO tendencyVO = new TendencyVO();
            Map<Integer, Double> someDayConsumeEachStudent = entry.getValue();
            tendencyVO.setMax(Double.MIN_VALUE);
            tendencyVO.setMin(Double.MAX_VALUE);
            for (Map.Entry<Integer, Double> entryEntry : someDayConsumeEachStudent.entrySet()) {
                tendencyVO.setMax(Math.max(tendencyVO.getMax(), entryEntry.getValue()));
                tendencyVO.setMin(Math.min(tendencyVO.getMin(), entryEntry.getValue()));
            }
            res.put(entry.getKey(), tendencyVO);
        }
        for (Map.Entry<String, TendencyVO> entry : res.entrySet()) {
            entry.getValue().setAvg(dailyTotalConsume.get(entry.getKey()) / classSize);
        }
        return res;
    }

    /**
     * 得到某班所有时间段的消费总额
     * key: 日期时间
     * value: 消费总额
     *
     * @param classId
     */
    @Override
    public Map<String, Double> getTotalConsume(Integer classId) {
        List<Consume> aClassConsume = consumeMapper.queryAClassConsume(classId);
        // to save the sum of consumption some day
        Map<String, Double> res = new LinkedHashMap<>();
        aClassConsume.forEach(consume -> {
            String consumeTime = DateUtil.getString(consume.getContime(), DateUtil.yyyyMMdd_dash);
            Double consumeMoney = consume.getConmoney();
            res.put(consumeTime,
                    res.getOrDefault(consumeTime, 0.0) + consumeMoney);
        });
        return res;
    }

    /**
     * 得到班级基本信息，有班级ID、班级名称、班级人数、各科老师的ID、名字
     *
     * @param classId
     */
    @Override
    public Map<String, Object> getClassBasicInfo(Integer classId) {
        Map<String, Object> res = new HashMap<>();
        res.put("classId", classId);
        Student student = new Student();
        student.setClassId(classId);
        List<Student> students = studentMapper.select(student);
        res.put("classSize", students.size());
        if (students.size() > 0) {
            res.put("className", students.get(0).getClassName());
        } else {
            res.put("className", "空班级");
        }
        // 循环每一门学科
        Teacher teacher = new Teacher();
        teacher.setClassId(classId);
        for (int i = 1; i <= 9; ++i) {
            teacher.setSubId(i);
            Teacher temp = teacherMapper.selectOne(teacher);
            res.put("" + i, temp);
        }
        return res;
    }

    /**
     * 得到班级内所有学生的信息
     *
     * @param classId
     */
    @Override
    public List<Student> getClassAllStudents(Integer classId) {
        Student student = new Student();
        student.setClassId(classId);
        List<Student> students = studentMapper.select(student);
        return students;
    }
}
