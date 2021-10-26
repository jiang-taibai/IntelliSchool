package com.dajiangsai.mapper;

import com.dajiangsai.my.mapper.MyMapper;
import com.dajiangsai.pojo.Score;
import com.dajiangsai.pojo.vo.ExamIdNameVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ScoreMapper extends MyMapper<Score> {

    /**
     * 查询某次考试中某班的所有科目的总分
     */
    public List<Double> queryOneTestOneClassTotalScore(@Param("examId") Integer examId,@Param("classId") Integer classId);

    /**
     * 根据学号查询Ta所拥有的所有考试ID与考试名称
     */
    public List<ExamIdNameVO> queryAllExamByStudentId(@Param("studentId") Integer studentId);
}