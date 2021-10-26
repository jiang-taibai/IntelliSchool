package com.dajiangsai.controller;

import com.dajiangsai.service.TeacherAllocationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Map;

/**
 * <p>创建时间：2021/2/16 19:26</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@RestController
@RequestMapping("/teacherAllocation")
@Api("教书分配API")
public class TeacherAllocationController {

    @Autowired
    private TeacherAllocationService teacherAllocationService;

    @GetMapping("/getTeacherClassifyBySubjectAndGrade")
    @ApiOperation(value = "得到师资分配情况",
            notes = "key: 学科，取值 语文、数学、英语、物理、化学、生物等13门学科, value.key: 年级，取值高一、高二、高三, value.value: 人数，释义为某年级某学科的教师人数，例如教学高一语文的老师数量")
    public Map<String, Map<String, Integer>> getTeacherClassifyBySubjectAndGrade() {
        return teacherAllocationService.getTeacherClassifyBySubjectAndGrade();
    }

    @GetMapping("/getTeacherToClassClassifyBySubject")
    @ApiOperation(value = "得到教师班级对应情况，按学科分类",
            notes = "key: 学科，取值 语文、数学、英语等13门学科, value.key: 教师ID，具体显示的时候需要辅助另一个方法为 getTeacherIdToName, value.value: 教师所教授的所有班级名称")
    public Map<String, Map<Integer, ArrayList<String>>> getTeacherToClassClassifyBySubject() {
        return teacherAllocationService.getTeacherToClassClassifyBySubject();
    }

    @GetMapping("/getTeacherIdToName")
    @ApiOperation(value = "得到所有老师的ID名称映射表", notes = "")
    public Map<Integer, String> getTeacherIdToName() {
        return teacherAllocationService.getTeacherIdToName();
    }

}
