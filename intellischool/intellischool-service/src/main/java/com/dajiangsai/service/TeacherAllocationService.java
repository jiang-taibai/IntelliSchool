package com.dajiangsai.service;

import java.util.ArrayList;
import java.util.Map;

/**
 * <p>创建时间：2021/2/16 17:31</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public interface TeacherAllocationService {

    /**
     * 得到师资分配情况
     * key: 学科，取值 语文、数学、英语、物理、化学、生物等13门学科
     * value:
     * -- key: 年级，取值高一、高二、高三
     * -- value: 人数，释义为某年级某学科的教师人数，例如教学高一语文的老师数量
     */
    public Map<String, Map<String, Integer>> getTeacherClassifyBySubjectAndGrade();

    /**
     * 得到教师班级对应情况，按学科分类
     * key: 学科，取值 语文、数学、英语等13门学科
     * value:
     * -- key: 教师ID，具体显示的时候需要辅助另一个方法为 getTeacherIdToName
     * -- value: 教师所教授的所有班级名称
     */
    public Map<String, Map<Integer, ArrayList<String>>> getTeacherToClassClassifyBySubject();

    /**
     * 得到所有老师的ID与名称的对应map
     */
    public Map<Integer, String> getTeacherIdToName();
}
