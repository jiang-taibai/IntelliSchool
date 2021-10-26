package com.dajiangsai.service;

import com.dajiangsai.pojo.vo.ScoreInfoVO;
import com.dajiangsai.pojo.vo.ScoreRankVO;
import com.dajiangsai.pojo.vo.TotalScoreRankVO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * <p>创建时间：2021/2/17 19:06</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public interface ScoreRankService {

    /**
     * 得到某次考试某学科的班内学生的班排名、校排名情况
     * key: 学科名称
     * value.key: 班级名称
     * value.value: 某班级某学科的排名情况
     *
     * 先遍历校排名情况，再分班处理加入校排名情况
     */
    public Map<String, ArrayList<ScoreRankVO>> querySubjectRank(Integer examId, Integer subjectId);

    /**
     * 查询某次考试班级的校内总分排名情况
     * key: 班级名称
     * value: 班内所有学生的总分班排名与校排名
     */
    public Map<String, ArrayList<ScoreRankVO>> querySumSubjectRank(Integer examId);

}
