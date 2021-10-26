package com.dajiangsai.pojo.vo;

import lombok.Data;

/**
 * <p>创建时间：2021/2/17 16:51</p>
 * <p>主要功能：可用于存储 某次考试某科目的班内排名情况、和某次考试某科目的校内排名情况</p>
 *
 * @author 太白
 */
@Data
public class ScoreInfoVO {
    private Integer exam_id;
    private Integer exam_subject;
    private Integer class_id;
    private String class_name;
    private Integer stu_id;
    private Double exam_score;
}
