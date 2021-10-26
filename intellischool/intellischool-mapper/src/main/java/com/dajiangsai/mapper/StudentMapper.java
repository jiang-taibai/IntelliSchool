package com.dajiangsai.mapper;

import com.dajiangsai.my.mapper.MyMapper;
import com.dajiangsai.pojo.Student;
import com.dajiangsai.pojo.vo.StudentIdNameVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

public interface StudentMapper extends MyMapper<Student> {

    public List<StudentIdNameVO> queryAllStudentIdAndName();

}