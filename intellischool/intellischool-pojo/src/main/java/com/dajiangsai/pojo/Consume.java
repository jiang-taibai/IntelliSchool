package com.dajiangsai.pojo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

public class Consume implements Serializable {
    /**
     * 消费时间
     */
    @Column(name = "conTime")
    private Date contime;

    /**
     * 消费金额
     */
    @Column(name = "conMoney")
    private Double conmoney;

    /**
     * 对一个学生信息表studentid
     */
    @Column(name = "stu_id")
    private Integer stuId;

    /**
     * 姓名
     */
    @Column(name = "stu_name")
    private String stuName;

    /**
     * 性别
     */
    @Column(name = "stu_sex")
    private String stuSex;

    private static final long serialVersionUID = 1L;

    public Consume(Date contime, Double conmoney, Integer stuId, String stuName, String stuSex) {
        this.contime = contime;
        this.conmoney = conmoney;
        this.stuId = stuId;
        this.stuName = stuName;
        this.stuSex = stuSex;
    }

    public Consume() {
        super();
    }

    /**
     * 获取消费时间
     *
     * @return conTime - 消费时间
     */
    public Date getContime() {
        return contime;
    }

    /**
     * 设置消费时间
     *
     * @param contime 消费时间
     */
    public void setContime(Date contime) {
        this.contime = contime;
    }

    /**
     * 获取消费金额
     *
     * @return conMoney - 消费金额
     */
    public Double getConmoney() {
        return conmoney;
    }

    /**
     * 设置消费金额
     *
     * @param conmoney 消费金额
     */
    public void setConmoney(Double conmoney) {
        this.conmoney = conmoney;
    }

    /**
     * 获取对一个学生信息表studentid
     *
     * @return stu_id - 对一个学生信息表studentid
     */
    public Integer getStuId() {
        return stuId;
    }

    /**
     * 设置对一个学生信息表studentid
     *
     * @param stuId 对一个学生信息表studentid
     */
    public void setStuId(Integer stuId) {
        this.stuId = stuId;
    }

    /**
     * 获取姓名
     *
     * @return stu_name - 姓名
     */
    public String getStuName() {
        return stuName;
    }

    /**
     * 设置姓名
     *
     * @param stuName 姓名
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

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", contime=").append(contime);
        sb.append(", conmoney=").append(conmoney);
        sb.append(", stuId=").append(stuId);
        sb.append(", stuName=").append(stuName);
        sb.append(", stuSex=").append(stuSex);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}