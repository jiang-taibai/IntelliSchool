package com.dajiangsai.controller;

import com.dajiangsai.common.exception.EnumNotFoundException;
import com.dajiangsai.pojo.Student;
import com.dajiangsai.pojo.Teacher;
import com.dajiangsai.pojo.vo.TendencyVO;
import com.dajiangsai.service.ClassDataService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>创建时间：2021/2/20 14:07</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@RestController
@RequestMapping("/classData")
@Api(value = "班级数据API")
public class ClassDataController {

    @Autowired
    private ClassDataService classDataService;

    /**
     * 得到某班某学科的老师信息
     */
    @GetMapping("/getClassSubjectTeacherInfo")
    @ApiOperation(value = "得到某班某学科的老师信息", notes = "传入参数班级ID与学科ID，即可返回教师信息")
    public Teacher getClassSubjectTeacherInfo(@RequestParam Integer classId,
                                              @RequestParam Integer subjectId) {
        return classDataService.getClassSubjectTeacherInfo(classId, subjectId);
    }

    /**
     * 得到所有考试的所有学科的最高分、最低分、平均分的值
     * key: 学科名称
     * value: 成绩趋势的数组
     */
    @GetMapping("/getExamAllSubjectTendency")
    @ApiOperation(value = "得到所有考试的所有学科的最高分、最低分、平均分的值", notes = "key: 学科名称, value: 成绩趋势的数组")
    public Map<String, ArrayList<TendencyVO>> getExamAllSubjectTendency(@RequestParam Integer classId) {
        return classDataService.getExamAllSubjectTendency(classId);
    }

    /**
     * 得到某次考试某学科某班的分数分布
     * 值分别为 0-某科的最高分的人数
     */
    @GetMapping("/getExamSomeSubjectScoreDistribution")
    @ApiOperation(value = "得到某次考试所有学科某班的分数分布", notes = "值分别为 0-某科的最高分的人数")
    public Map<String, ArrayList<Integer>> getExamSomeSubjectScoreDistribution(@RequestParam Integer examId,
                                                                  @RequestParam Integer classId) {
        try {
            return classDataService.getExamAllSubjectScoreDistribution(examId, classId);
        } catch (EnumNotFoundException e) {
            e.printStackTrace();
        }
        return new HashMap<>();
    }

    /**
     * 得到某次考试某班总分分数分布
     * 数组坐标为 总分/100。例如 120分为120/100=1，80分为80/100=0 等等
     */
    @GetMapping("/getExamTotalScoreDistribution")
    @ApiOperation(value = "得到某次考试某班总分分数分布", notes = "数组坐标为 总分/100。例如 120分为120/100=1，80分为80/100=0 等等")
    public ArrayList<Integer> getExamTotalScoreDistribution(@RequestParam Integer examId,
                                                            @RequestParam Integer classId) {
        return classDataService.getExamTotalScoreDistribution(examId, classId);
    }

    /**
     * 得到某班所有时间段的消费金额最高值、最低值、平均值
     * key: 日期时间，格式可为 yyyy-MM-dd
     * value: 趋势 VO
     */
    @GetMapping("/getConsumeTendency")
    @ApiOperation(value = "得到某班所有时间段的消费金额最高值、最低值、平均值", notes = "key: 日期时间，格式可为 yyyy-MM-dd, value: 趋势 VO")
    public Map<String, TendencyVO> getConsumeTendency(@RequestParam Integer classId) {
        return classDataService.getConsumeTendency(classId);
    }

    /**
     * 得到某班所有时间段的消费总额
     * key: 日期时间
     * value: 消费总额
     */
    @GetMapping("/getTotalConsume")
    @ApiOperation(value = "得到某班所有时间段的消费总额", notes = "key: 日期时间, value: 消费总额")
    public Map<String, Double> getTotalConsume(@RequestParam Integer classId) {
        return classDataService.getTotalConsume(classId);
    }

    /**
     * 得到班级基本信息，有班级ID、班级名称、班级人数、各科老师的ID、名字
     */
    @GetMapping("/getClassBasicInfo")
    @ApiOperation(value = "得到某班基本信息", notes = "key: 基本信息标题, value: 值")
    public Map<String, Object> getClassBasicInfo(Integer classId) {
        return classDataService.getClassBasicInfo(classId);
    }

    /**
     * 得到班级内所有学生的信息
     */
    @GetMapping("/getClassAllStudents")
    @ApiOperation(value = "得到某班的所有学生信息", notes = "学生类列表")
    public List<Student> getClassAllStudents(Integer classId) {
        return classDataService.getClassAllStudents(classId);
    }
}
