package com.dajiangsai.service.impl;

import com.dajiangsai.mapper.TeacherAllocationDistinctMapper;
import com.dajiangsai.mapper.TeacherMapper;
import com.dajiangsai.pojo.Teacher;
import com.dajiangsai.pojo.vo.TeacherAllocationDistinctVO;
import com.dajiangsai.service.TeacherAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>创建时间：2021/2/16 18:26</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Service
public class TeacherAllocationServiceImpl implements TeacherAllocationService {

    @Autowired
    private TeacherMapper teacherMapper;
    @Autowired
    private TeacherAllocationDistinctMapper teacherAllocationDistinctMapper;

    /**
     * 得到师资分配情况
     * key: 学科，取值 语文、数学、英语、物理、化学、生物等13门学科
     * value:
     * -- key: 年级，取值高一、高二、高三
     * -- value: 人数，释义为某年级某学科的教师人数，例如教学高一语文的老师数量
     */
    @Override
    public Map<String, Map<String, Integer>> getTeacherClassifyBySubjectAndGrade() {
        List<TeacherAllocationDistinctVO> teachers = teacherAllocationDistinctMapper.queryTeacherAllocationDistinct();
        Map<String, Map<String, Integer>> res = new HashMap<>();
        teachers.forEach(teacher -> {
            String sub_name = teacher.getSub_name();
            Map<String, Integer> gradesInfo = res.getOrDefault(sub_name, new HashMap<>());
            String grade_name = teacher.getGrade_name();
            Integer count = gradesInfo.getOrDefault(grade_name, 0);
            gradesInfo.put(grade_name, count + 1);
            res.put(sub_name, gradesInfo);
        });
        return res;
    }

    /**
     * 得到教师班级对应情况，按学科分类
     * key: 学科，取值 语文、数学、英语等13门学科
     * value:
     * -- key: 教师ID
     * -- value: 教师所教授的所有班级名称
     */
    @Override
    public Map<String, Map<Integer, ArrayList<String>>> getTeacherToClassClassifyBySubject() {
        List<Teacher> teachers = teacherMapper.selectAll();
        Map<String, Map<Integer, ArrayList<String>>> res = new HashMap<>();
        teachers.forEach(teacher -> {
            String subName = teacher.getSubName();
            Map<Integer, ArrayList<String>> teacherToClass = res.getOrDefault(subName, new HashMap<>());
            Integer id = teacher.getId();
            ArrayList<String> clazzs = teacherToClass.getOrDefault(id, new ArrayList<>());
            clazzs.add(teacher.getClassName());
            teacherToClass.put(id, clazzs);
            res.put(subName, teacherToClass);
        });
        return res;
    }

    /**
     * 得到所有老师的ID与名称的对应map
     */
    @Override
    public Map<Integer, String> getTeacherIdToName() {
        List<Teacher> teachers = teacherMapper.selectAll();
        Map<Integer, String> res = new HashMap<>();
        teachers.forEach(teacher -> {
            res.putIfAbsent(teacher.getId(), teacher.getName());
        });
        return res;
    }


}
