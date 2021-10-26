package com.dajiangsai.pojo;

import javax.persistence.*;
import java.io.Serializable;

public class Teacher implements Serializable {
    /**
     * 教师id
     */
    @Id
    private Integer id;

    /**
     * 班级id
     */
    @Id
    @Column(name = "class_id")
    private Integer classId;

    /**
     * 学期
     */
    @Id
    private String term;

    /**
     * 学科id
     */
    @Id
    @Column(name = "sub_id")
    private Integer subId;

    /**
     * 班级名称
     */
    @Column(name = "class_name")
    private String className;

    /**
     * 年级名称
     */
    @Column(name = "grade_name")
    private String gradeName;

    /**
     * 学科名
     */
    @Column(name = "sub_name")
    private String subName;

    /**
     * 教师名称
     */
    private String name;

    private static final long serialVersionUID = 1L;

    public Teacher(Integer id, Integer classId, String term, Integer subId, String className, String gradeName, String subName, String name) {
        this.id = id;
        this.classId = classId;
        this.term = term;
        this.subId = subId;
        this.className = className;
        this.gradeName = gradeName;
        this.subName = subName;
        this.name = name;
    }

    public Teacher() {
        super();
    }

    /**
     * 获取教师id
     *
     * @return id - 教师id
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置教师id
     *
     * @param id 教师id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取班级id
     *
     * @return class_id - 班级id
     */
    public Integer getClassId() {
        return classId;
    }

    /**
     * 设置班级id
     *
     * @param classId 班级id
     */
    public void setClassId(Integer classId) {
        this.classId = classId;
    }

    /**
     * 获取学期
     *
     * @return term - 学期
     */
    public String getTerm() {
        return term;
    }

    /**
     * 设置学期
     *
     * @param term 学期
     */
    public void setTerm(String term) {
        this.term = term;
    }

    /**
     * 获取学科id
     *
     * @return sub_id - 学科id
     */
    public Integer getSubId() {
        return subId;
    }

    /**
     * 设置学科id
     *
     * @param subId 学科id
     */
    public void setSubId(Integer subId) {
        this.subId = subId;
    }

    /**
     * 获取班级名称
     *
     * @return class_name - 班级名称
     */
    public String getClassName() {
        return className;
    }

    /**
     * 设置班级名称
     *
     * @param className 班级名称
     */
    public void setClassName(String className) {
        this.className = className;
    }

    /**
     * 获取年级名称
     *
     * @return grade_name - 年级名称
     */
    public String getGradeName() {
        return gradeName;
    }

    /**
     * 设置年级名称
     *
     * @param gradeName 年级名称
     */
    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }

    /**
     * 获取学科名
     *
     * @return sub_name - 学科名
     */
    public String getSubName() {
        return subName;
    }

    /**
     * 设置学科名
     *
     * @param subName 学科名
     */
    public void setSubName(String subName) {
        this.subName = subName;
    }

    /**
     * 获取教师名称
     *
     * @return name - 教师名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置教师名称
     *
     * @param name 教师名称
     */
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", classId=").append(classId);
        sb.append(", term=").append(term);
        sb.append(", subId=").append(subId);
        sb.append(", className=").append(className);
        sb.append(", gradeName=").append(gradeName);
        sb.append(", subName=").append(subName);
        sb.append(", name=").append(name);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}