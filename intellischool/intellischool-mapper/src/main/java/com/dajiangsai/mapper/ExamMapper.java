package com.dajiangsai.mapper;

import com.dajiangsai.my.mapper.MyMapper;
import com.dajiangsai.pojo.Exam;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ExamMapper extends MyMapper<Exam> {

    public List<Exam> queryClassAllExam(@Param("classId") Integer classId);

}