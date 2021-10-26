package com.dajiangsai.mapper;

import com.dajiangsai.my.mapper.MyMapper;
import com.dajiangsai.pojo.Teacher;
import com.dajiangsai.pojo.vo.TeacherAllocationDistinctVO;

import java.util.List;

public interface TeacherAllocationDistinctMapper {

    /**
     * 查询不重复的教师，用于统计高一、高二、高三各科老师人数
     */
    public List<TeacherAllocationDistinctVO> queryTeacherAllocationDistinct();

}