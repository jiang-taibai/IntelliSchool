package com.dajiangsai.service;

import com.dajiangsai.common.enums.SexEnum;

import java.util.Map;

/**
 * <p>创建时间：2021/2/19 11:01</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public interface ConsumeInfoService {

    /**
     * 查询整一学期的每日 消费总金额与人均消费
     * key: 日期名称，格式为 MM/dd
     * key.key: 当日消费信息标题，取值为 消费总额、人均消费
     * key.value: 当日消费信息，意为 当日消费总额、当日人均消费
     *
     * 当参数sexEnum为 SexEnum.MALE时只返回男生数据，为SexEnum.FEMALE时只返回女生数据
     * 为 SexEnum.ALL时返回男女共同数据
     */
    public Map<String, Map<String, Object>> queryDailyConsume(SexEnum sexEnum);

}
