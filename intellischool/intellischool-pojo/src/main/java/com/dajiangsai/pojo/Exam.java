package com.dajiangsai.pojo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

public class Exam implements Serializable {
    /**
     * 考试类型id
     */
    @Id
    @Column(name = "exam_id")
    private Integer examId;

    /**
     * 考试学科
     */
    @Id
    @Column(name = "exam_subject")
    private Integer examSubject;

    /**
     * 考试名称+学科
     */
    @Column(name = "exam_name")
    private String examName;

    /**
     * 考试类型，月考、期中考、末考等
     */
    @Column(name = "exam_type")
    private String examType;

    /**
     * 考试时间
     */
    @Column(name = "exam_time")
    private Date examTime;

    private static final long serialVersionUID = 1L;

    public Exam(Integer examId, Integer examSubject, String examName, String examType, Date examTime) {
        this.examId = examId;
        this.examSubject = examSubject;
        this.examName = examName;
        this.examType = examType;
        this.examTime = examTime;
    }

    public Exam() {
        super();
    }

    /**
     * 获取考试类型id
     *
     * @return exam_id - 考试类型id
     */
    public Integer getExamId() {
        return examId;
    }

    /**
     * 设置考试类型id
     *
     * @param examId 考试类型id
     */
    public void setExamId(Integer examId) {
        this.examId = examId;
    }

    /**
     * 获取考试学科
     *
     * @return exam_subject - 考试学科
     */
    public Integer getExamSubject() {
        return examSubject;
    }

    /**
     * 设置考试学科
     *
     * @param examSubject 考试学科
     */
    public void setExamSubject(Integer examSubject) {
        this.examSubject = examSubject;
    }

    /**
     * 获取考试名称+学科
     *
     * @return exam_name - 考试名称+学科
     */
    public String getExamName() {
        return examName;
    }

    /**
     * 设置考试名称+学科
     *
     * @param examName 考试名称+学科
     */
    public void setExamName(String examName) {
        this.examName = examName;
    }

    /**
     * 获取考试类型，月考、期中考、末考等
     *
     * @return exam_type - 考试类型，月考、期中考、末考等
     */
    public String getExamType() {
        return examType;
    }

    /**
     * 设置考试类型，月考、期中考、末考等
     *
     * @param examType 考试类型，月考、期中考、末考等
     */
    public void setExamType(String examType) {
        this.examType = examType;
    }

    /**
     * 获取考试时间
     *
     * @return exam_time - 考试时间
     */
    public Date getExamTime() {
        return examTime;
    }

    /**
     * 设置考试时间
     *
     * @param examTime 考试时间
     */
    public void setExamTime(Date examTime) {
        this.examTime = examTime;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", examId=").append(examId);
        sb.append(", examSubject=").append(examSubject);
        sb.append(", examName=").append(examName);
        sb.append(", examType=").append(examType);
        sb.append(", examTime=").append(examTime);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}