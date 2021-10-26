package com.dajiangsai.pojo.vo;

import lombok.Data;

/**
 * <p>创建时间：2021/2/20 14:33</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Data
public class TendencyVO {

    /**
     * 最高值
     */
    private Double max;

    /**
     * 最低值
     */
    private Double min;

    /**
     * 平均值
     */
    private Double avg;
}
