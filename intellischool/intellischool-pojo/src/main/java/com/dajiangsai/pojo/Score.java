package com.dajiangsai.pojo;

import javax.persistence.*;
import java.io.Serializable;

public class Score implements Serializable {
    /**
     * 考试ID
     */
    @Id
    @Column(name = "exam_id")
    private Integer examId;

    /**
     * 学生ID
     */
    @Id
    @Column(name = "stu_id")
    private Integer stuId;

    /**
     * 学科类型
     */
    @Id
    @Column(name = "exam_subject")
    private Integer examSubject;

    /**
     * 考试成绩（-1为作弊，-2为缺考，-3为免考）
     */
    @Column(name = "exam_score")
    private Double examScore;

    private static final long serialVersionUID = 1L;

    public Score(Integer examId, Integer stuId, Integer examSubject, Double examScore) {
        this.examId = examId;
        this.stuId = stuId;
        this.examSubject = examSubject;
        this.examScore = examScore;
    }

    public Score() {
        super();
    }

    /**
     * 获取考试ID
     *
     * @return exam_id - 考试ID
     */
    public Integer getExamId() {
        return examId;
    }

    /**
     * 设置考试ID
     *
     * @param examId 考试ID
     */
    public void setExamId(Integer examId) {
        this.examId = examId;
    }

    /**
     * 获取学生ID
     *
     * @return stu_id - 学生ID
     */
    public Integer getStuId() {
        return stuId;
    }

    /**
     * 设置学生ID
     *
     * @param stuId 学生ID
     */
    public void setStuId(Integer stuId) {
        this.stuId = stuId;
    }

    /**
     * 获取学科类型
     *
     * @return exam_subject - 学科类型
     */
    public Integer getExamSubject() {
        return examSubject;
    }

    /**
     * 设置学科类型
     *
     * @param examSubject 学科类型
     */
    public void setExamSubject(Integer examSubject) {
        this.examSubject = examSubject;
    }

    /**
     * 获取考试成绩（-1为作弊，-2为缺考，-3为免考）
     *
     * @return exam_score - 考试成绩（-1为作弊，-2为缺考，-3为免考）
     */
    public Double getExamScore() {
        return examScore;
    }

    /**
     * 设置考试成绩（-1为作弊，-2为缺考，-3为免考）
     *
     * @param examScore 考试成绩（-1为作弊，-2为缺考，-3为免考）
     */
    public void setExamScore(Double examScore) {
        this.examScore = examScore;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", examId=").append(examId);
        sb.append(", stuId=").append(stuId);
        sb.append(", examSubject=").append(examSubject);
        sb.append(", examScore=").append(examScore);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}