package com.dajiangsai.mapper;

import com.dajiangsai.pojo.vo.ScoreInfoVO;
import com.dajiangsai.pojo.vo.TotalScoreRankVO;

import java.util.List;
import java.util.Map;

/**
 * <p>创建时间：2021/2/17 19:06</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public interface ScoreRankMapper {

    /**
     * 查询某次考试某学科的班排名情况
     * #{paramasMap.exam_id}
     * #{paramasMap.exam_subject}
     * #{paramasMap.class_id}
     */
    public List<ScoreInfoVO> queryRankInClass(Map<String, Object> map);

    /**
     * 查询某次考试某学科的校排名情况
     * #{paramasMap.exam_id}
     * #{paramasMap.exam_subject}
     */
    public List<ScoreInfoVO> queryRankInSchool(Map<String, Object> map);

    /**
     * 查询某次考试的总分 班级排名情况
     * #{paramasMap.exam_id}
     */
    public List<TotalScoreRankVO> queryTotalRankInClass(Map<String, Object> map);

    /**
     * 查询某次考试的总分 校内排名情况
     * #{paramasMap.exam_id}
     */
    public List<TotalScoreRankVO> queryTotalRankInSchool(Map<String, Object> map);


}
