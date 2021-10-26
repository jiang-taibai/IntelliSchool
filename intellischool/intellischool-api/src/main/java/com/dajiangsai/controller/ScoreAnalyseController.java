package com.dajiangsai.controller;

import com.dajiangsai.pojo.vo.ClassInfoVO;
import com.dajiangsai.pojo.vo.ScoreInfoVO;
import com.dajiangsai.pojo.vo.ScoreRankVO;
import com.dajiangsai.service.impl.ScoreRankServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>创建时间：2021/2/18 18:08</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@RestController
@RequestMapping("/scoreAnalyse")
@Api(value = "成绩分析API")
public class ScoreAnalyseController {

    @Autowired
    ScoreRankServiceImpl scoreRankServiceImpl;

    @GetMapping("/querySubjectRank")
    @ApiOperation(value = "得到某次考试某学科的班内学生的班排名、校排名情况",
            notes = "key: 学科名称 value.key: 班级名称 value.value: 某班级某学科的排名情况 先遍历校排名情况，再分班处理加入校排名情况")
    public Map<String, ArrayList<ScoreRankVO>> querySubjectRank(@RequestParam Integer examId, @RequestParam Integer subjectId) {
        return scoreRankServiceImpl.querySubjectRank(examId, subjectId);
    }

    @GetMapping("/querySumSubjectRank")
    @ApiOperation(value = "查询某次考试班级的校内总分排名情况", notes = "key: 班级名称 value: 班内所有学生的总分班排名与校排")
    public Map<String, ArrayList<ScoreRankVO>> querySumSubjectRank(@RequestParam Integer examId) {
        return scoreRankServiceImpl.querySumSubjectRank(examId);
    }

}
