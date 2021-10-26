package com.dajiangsai.pojo.vo;

import lombok.Data;

/**
 * <p>创建时间：2021/2/17 19:24</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Data
public class ScoreRankVO {

    /**
     * 班排名
     */
    private Integer classRank;

    /**
     * 校排名
     */
    private Integer schoolRank;

    /**
     * 分数
     */
    private Double score;
}
