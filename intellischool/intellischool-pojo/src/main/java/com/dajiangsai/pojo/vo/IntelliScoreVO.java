package com.dajiangsai.pojo.vo;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

/**
 * <p>创建时间：2021/3/7 10:52</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Data
public class IntelliScoreVO {
//    private Integer stuId;
//    private String stuName;
//    private String stuSex;
//    private String stuNation;
//    private Date stuBorndate;
//    private String className;
//    private String stuNativeplace;
//    private String stuResidencetype;
//    private String stuPolicy;
//    private Integer classId;

    private Integer examId;
    private String examName;
    private Double examScore;
}
