package com.dajiangsai.pojo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

public class Student implements Serializable {
    /**
     * 学生id
     */
    @Id
    @Column(name = "stu_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "SELECT LAST_INSERT_ID()")
    private Integer stuId;

    /**
     * 学生姓名
     */
    @Column(name = "stu_name")
    private String stuName;

    /**
     * 性别
     */
    @Column(name = "stu_sex")
    private String stuSex;

    /**
     * 民族
     */
    @Column(name = "stu_nation")
    private String stuNation;

    /**
     * 出生日期
     */
    @Column(name = "stu_borndate")
    private Date stuBorndate;

    /**
     * 班级名
     */
    @Column(name = "class_name")
    private String className;

    /**
     * 家庭住址，精确至市区
     */
    @Column(name = "stu_nativePlace")
    private String stuNativeplace;

    /**
     * 家庭类型，农村家庭、城市家庭
     */
    @Column(name = "stu_residenceType")
    private String stuResidencetype;

    /**
     * 政治面貌，共青团员、群众
     */
    @Column(name = "stu_policy")
    private String stuPolicy;

    /**
     * 班级id
     */
    @Column(name = "class_id")
    private Integer classId;

    /**
     * 班级学期
     */
    private String term;

    /**
     * 是否住校
     */
    private String zhusu;

    /**
     * 是否退学
     */
    @Column(name = "leaveSchool")
    private String leaveschool;

    /**
     * 寝室号
     */
    private String sroom;

    private static final long serialVersionUID = 1L;

    public Student(Integer stuId, String stuName, String stuSex, String stuNation, Date stuBorndate, String className, String stuNativeplace, String stuResidencetype, String stuPolicy, Integer classId, String term, String zhusu, String leaveschool, String sroom) {
        this.stuId = stuId;
        this.stuName = stuName;
        this.stuSex = stuSex;
        this.stuNation = stuNation;
        this.stuBorndate = stuBorndate;
        this.className = className;
        this.stuNativeplace = stuNativeplace;
        this.stuResidencetype = stuResidencetype;
        this.stuPolicy = stuPolicy;
        this.classId = classId;
        this.term = term;
        this.zhusu = zhusu;
        this.leaveschool = leaveschool;
        this.sroom = sroom;
    }

    public Student() {
        super();
    }

    /**
     * 获取学生id
     *
     * @return stu_id - 学生id
     */
    public Integer getStuId() {
        return stuId;
    }

    /**
     * 设置学生id
     *
     * @param stuId 学生id
     */
    public void setStuId(Integer stuId) {
        this.stuId = stuId;
    }

    /**
     * 获取学生姓名
     *
     * @return stu_name - 学生姓名
     */
    public String getStuName() {
        return stuName;
    }

    /**
     * 设置学生姓名
     *
     * @param stuName 学生姓名
     */
    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    /**
     * 获取性别
     *
     * @return stu_sex - 性别
     */
    public String getStuSex() {
        return stuSex;
    }

    /**
     * 设置性别
     *
     * @param stuSex 性别
     */
    public void setStuSex(String stuSex) {
        this.stuSex = stuSex;
    }

    /**
     * 获取民族
     *
     * @return stu_nation - 民族
     */
    public String getStuNation() {
        return stuNation;
    }

    /**
     * 设置民族
     *
     * @param stuNation 民族
     */
    public void setStuNation(String stuNation) {
        this.stuNation = stuNation;
    }

    /**
     * 获取出生日期
     *
     * @return stu_borndate - 出生日期
     */
    public Date getStuBorndate() {
        return stuBorndate;
    }

    /**
     * 设置出生日期
     *
     * @param stuBorndate 出生日期
     */
    public void setStuBorndate(Date stuBorndate) {
        this.stuBorndate = stuBorndate;
    }

    /**
     * 获取班级名
     *
     * @return class_name - 班级名
     */
    public String getClassName() {
        return className;
    }

    /**
     * 设置班级名
     *
     * @param className 班级名
     */
    public void setClassName(String className) {
        this.className = className;
    }

    /**
     * 获取家庭住址，精确至市区
     *
     * @return stu_nativePlace - 家庭住址，精确至市区
     */
    public String getStuNativeplace() {
        return stuNativeplace;
    }

    /**
     * 设置家庭住址，精确至市区
     *
     * @param stuNativeplace 家庭住址，精确至市区
     */
    public void setStuNativeplace(String stuNativeplace) {
        this.stuNativeplace = stuNativeplace;
    }

    /**
     * 获取家庭类型，农村家庭、城市家庭
     *
     * @return stu_residenceType - 家庭类型，农村家庭、城市家庭
     */
    public String getStuResidencetype() {
        return stuResidencetype;
    }

    /**
     * 设置家庭类型，农村家庭、城市家庭
     *
     * @param stuResidencetype 家庭类型，农村家庭、城市家庭
     */
    public void setStuResidencetype(String stuResidencetype) {
        this.stuResidencetype = stuResidencetype;
    }

    /**
     * 获取政治面貌，共青团员、群众
     *
     * @return stu_policy - 政治面貌，共青团员、群众
     */
    public String getStuPolicy() {
        return stuPolicy;
    }

    /**
     * 设置政治面貌，共青团员、群众
     *
     * @param stuPolicy 政治面貌，共青团员、群众
     */
    public void setStuPolicy(String stuPolicy) {
        this.stuPolicy = stuPolicy;
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
     * 获取班级学期
     *
     * @return term - 班级学期
     */
    public String getTerm() {
        return term;
    }

    /**
     * 设置班级学期
     *
     * @param term 班级学期
     */
    public void setTerm(String term) {
        this.term = term;
    }

    /**
     * 获取是否住校
     *
     * @return zhusu - 是否住校
     */
    public String getZhusu() {
        return zhusu;
    }

    /**
     * 设置是否住校
     *
     * @param zhusu 是否住校
     */
    public void setZhusu(String zhusu) {
        this.zhusu = zhusu;
    }

    /**
     * 获取是否退学
     *
     * @return leaveSchool - 是否退学
     */
    public String getLeaveschool() {
        return leaveschool;
    }

    /**
     * 设置是否退学
     *
     * @param leaveschool 是否退学
     */
    public void setLeaveschool(String leaveschool) {
        this.leaveschool = leaveschool;
    }

    /**
     * 获取寝室号
     *
     * @return sroom - 寝室号
     */
    public String getSroom() {
        return sroom;
    }

    /**
     * 设置寝室号
     *
     * @param sroom 寝室号
     */
    public void setSroom(String sroom) {
        this.sroom = sroom;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", stuId=").append(stuId);
        sb.append(", stuName=").append(stuName);
        sb.append(", stuSex=").append(stuSex);
        sb.append(", stuNation=").append(stuNation);
        sb.append(", stuBorndate=").append(stuBorndate);
        sb.append(", className=").append(className);
        sb.append(", stuNativeplace=").append(stuNativeplace);
        sb.append(", stuResidencetype=").append(stuResidencetype);
        sb.append(", stuPolicy=").append(stuPolicy);
        sb.append(", classId=").append(classId);
        sb.append(", term=").append(term);
        sb.append(", zhusu=").append(zhusu);
        sb.append(", leaveschool=").append(leaveschool);
        sb.append(", sroom=").append(sroom);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}