package com.dajiangsai.service.impl;

import com.dajiangsai.common.enums.SubjectEnum;
import com.dajiangsai.common.utils.DateUtil;
import com.dajiangsai.mapper.*;
import com.dajiangsai.pojo.Consume;
import com.dajiangsai.pojo.Exam;
import com.dajiangsai.pojo.Score;
import com.dajiangsai.pojo.Student;
import com.dajiangsai.pojo.vo.*;
import com.dajiangsai.service.StudentDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * <p>创建时间：2021/2/21 15:09</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Service
public class StudentDataServiceImpl implements StudentDataService {

    @Autowired
    private ExamMapper examMapper;

    @Autowired
    private ScoreMapper scoreMapper;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private ClassInfoMapper classInfoMapper;

    @Autowired
    private ScoreRankMapper scoreRankMapper;

    @Autowired
    private ConsumeMapper consumeMapper;

    /**
     * 查询某位学生的信息
     *
     * @param studentId
     */
    @Override
    public Student getStudentInfo(Integer studentId) {
        return studentMapper.selectByPrimaryKey(studentId);
    }

    /**
     * 查询某次考试某科有多少人参加考试
     *
     * @param examId
     * @param subjectId
     */
    @Override
    public Integer getNumberOfParticipants(Integer examId, Integer subjectId) {
        Score score = new Score();
        score.setExamId(examId);
        score.setExamSubject(subjectId);
        return scoreMapper.selectCount(score);
    }

    /**
     * 查询某次考试中某人的各科校排名情况
     *
     * @param examId
     * @param studentId
     */
    @Override
    public Map<String, Integer> getOneTestAllSubjectRankInSchool(Integer examId, Integer studentId) {
        Map<String, Integer> res = new HashMap<>();
        List<Score> scores = null;
        Score score = new Score();
        score.setExamId(examId);
        for (SubjectEnum subjectEnum : SubjectEnum.values()) {
            Integer subjectId = subjectEnum.val;
            score.setExamSubject(subjectId);
            scores = scoreMapper.select(score);
            res.put(subjectEnum.name, getRank_Score(scores, studentId));
        }
        return res;
    }

    /**
     * 辅助getOneTestAllSubjectRankInSchool方法，得到某学生在List表中的排名
     *
     * @param scores
     * @param studentId
     * @return
     */
    private Integer getRank_Score(List<Score> scores, Integer studentId) {
        scores.sort((o1, o2) -> {
            // 默认得分高的排在前面
            if (o1.getExamScore().equals(o2.getExamScore())) return 0;
            if (o1.getExamScore() > o2.getExamScore()) return -1;
            return 1;
        });

        int rank = 0;
        Double preScore = -150.0;
        boolean existStudent = false;
        for (Score score : scores) {
            if (!score.getExamScore().equals(preScore)) {
                rank++;
                preScore = score.getExamScore();
            }
            if (score.getStuId().equals(studentId)) {
                existStudent = true;
                break;
            }
        }

        return existStudent ? rank : -1;
    }

    /**
     * 得到所有考试总分中的 班级均分与个人得分
     * key: 考试名称
     * value.key: 班级均分/个人总分
     * value.value: 值
     *
     * @param studentId
     */
    @Override
    public Map<String, Map<String, Double>> getAllTestTotalScore_ClassAvgScoreAndPersonaScore(Integer studentId) {
        // 得到学生实例对象
        Student student = studentMapper.selectByPrimaryKey(studentId);
        // 得到该学生所考过的所有考试
        List<Exam> exams = examMapper.queryClassAllExam(student.getClassId());
        // 本方法的返回值
        Map<String, Map<String, Double>> res = new LinkedHashMap<>();
        // 班级人数
        Integer classSize = classInfoMapper.queryClassSize(student.getClassId());
        // 循环每次考试
        for (Exam exam : exams) {
            // 得到班级均分
            Map<String, Double> resSon = new HashMap<>();
            List<Double> scores = scoreMapper.queryOneTestOneClassTotalScore(exam.getExamId(), student.getClassId());
            Double sumScore = 0.0;
            for (Double score : scores) {
                sumScore += score;
            }
            resSon.put("班级均分", sumScore / classSize);

            // 得到个人总分
            Score score = new Score();
            score.setExamId(exam.getExamId());
            score.setStuId(studentId);
            List<Score> scoreList = scoreMapper.select(score);
            sumScore = scoreList.stream().mapToDouble(Score::getExamScore).sum();
            resSon.put("个人总分", sumScore);
            res.put(exam.getExamName(), resSon);
        }
        return res;
    }

    /**
     * 得到所有考试中个人校排名情况
     *
     * @param studentId
     */
    @Override
    public Map<String, Integer> getAllTestRankInSchool(Integer studentId) {
        Student student = studentMapper.selectByPrimaryKey(studentId);
        List<Exam> exams = examMapper.queryClassAllExam(student.getClassId());
        Map<String, Integer> res = new LinkedHashMap<>();
        for (Exam exam : exams) {
            List<TotalScoreRankVO> scores = scoreRankMapper.queryTotalRankInSchool(new HashMap<String, Object>() {{
                put("exam_id", exam.getExamId());
            }});
            res.put(exam.getExamName(), getRank_TotalScoreRankVO(scores, studentId));
        }
        return res;
    }

    /**
     * 辅助getAllTestRankInSchool方法，得到某学生在List表中的排名
     *
     * @param scores
     * @param studentId
     * @return
     */
    private Integer getRank_TotalScoreRankVO(List<TotalScoreRankVO> scores, Integer studentId) {
        scores.sort(new Comparator<TotalScoreRankVO>() {
            @Override
            public int compare(TotalScoreRankVO o1, TotalScoreRankVO o2) {
                // 默认得分高的排在前面
                if (o1.getTotal_score().equals(o2.getTotal_score())) return 0;
                if (o1.getTotal_score() > o2.getTotal_score()) return -1;
                return 1;
            }
        });

        Integer rank = 0;
        Double preScore = -150.0;
        for (TotalScoreRankVO score : scores) {
            if (!score.getTotal_score().equals(preScore)) {
                rank++;
                preScore = score.getTotal_score();
            }
            if (score.getStu_id().equals(studentId)) break;
        }
        return rank;
    }

    /**
     * 得到所有考试中某科目的个人校排名情况
     *
     * @param studentId
     * @param subjectId
     */
    @Override
    public Map<String, Integer> getAllTestSomeSubjectRankInSchool(Integer studentId, Integer subjectId) {
        Student student = studentMapper.selectByPrimaryKey(studentId);
        List<Exam> exams = examMapper.queryClassAllExam(student.getClassId());
        Map<String, Integer> res = new LinkedHashMap<>();
        Score score = new Score();
        score.setExamSubject(subjectId);
        for (Exam exam : exams) {
            score.setExamId(exam.getExamId());
            List<Score> scores = scoreMapper.select(score);
            res.put(exam.getExamName(), getRank_Score(scores, studentId));
        }
        return res;
    }

    /**
     * 得到所有时间段内个人消费总额
     * key: 时间字符串，格式可为yyyy-MM-dd
     * value: 某天消费的总额
     *
     * @param studentId
     */
    @Override
    public Map<String, Double> getTotalConsumeEachDay(Integer studentId) {
        Map<String, Double> res = new HashMap<>();

        Consume consumeTemp = new Consume();
        consumeTemp.setStuId(studentId);
        List<Consume> consumes = consumeMapper.select(consumeTemp);
        consumes.forEach(consume -> {
            String consumeTime = DateUtil.getString(consume.getContime(), DateUtil.yyyyMMdd_dash);
            res.put(consumeTime, res.getOrDefault(consumeTime, 0.0) + consume.getConmoney());
        });

        return res;
    }

    /**
     * 根据个人ID得到班级每日平均消费
     * key: 时间字符串，格式可为yyyy-MM-dd
     * value: 某天消费的总额
     *
     * @param someStudentId
     */
    @Override
    public Map<String, TendencyVO> getClassTotalConsumeEachDay(Integer someStudentId) {
        Map<String, TendencyVO> res = new HashMap<>();

        Student someStudent = studentMapper.selectByPrimaryKey(someStudentId);
        Integer classId = someStudent.getClassId();
        List<Consume> aClassConsume = consumeMapper.queryAClassConsume(classId);
        // to save the sum of consumption some day
        Map<String, Double> dailyTotalConsume = new HashMap<>();
        Map<String, Map<Integer, Double>> dailyConsumeEachStudent = new HashMap<>();
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
     * 根据个人ID得到他所拥有的考试ID与考试名称
     * key: 考试ID
     * value: 考试名称
     *
     * @param studentId
     */
    @Override
    public List<ExamIdNameVO> getAllExamByStudentId(Integer studentId) {
        return scoreMapper.queryAllExamByStudentId(studentId);
    }

    /**
     * 得到所有学生ID与名字
     */
    @Override
    public List<StudentIdNameVO> getAllStudentIdNames() {
        return studentMapper.queryAllStudentIdAndName();
    }
}
