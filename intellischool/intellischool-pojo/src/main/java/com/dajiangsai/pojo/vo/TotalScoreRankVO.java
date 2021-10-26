package com.dajiangsai.pojo.vo;

import lombok.Data;

/**
 * <p>创建时间：2021/2/17 19:03</p>
 * <p>主要功能：某次考试的校内总分排名情况</p>
 *
 * @author 太白
 */
@Data
public class TotalScoreRankVO {

    private Integer exam_id;
    private Integer class_id;
    private String class_name;
    private Integer stu_id;
    private Double total_score;

}
