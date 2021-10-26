package com.dajiangsai.controller;

import com.dajiangsai.pojo.vo.IntelliScoreVO;
import com.dajiangsai.service.IntelliAnalyseService;
import com.dajiangsai.service.IntelliScoreService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>创建时间：2021/3/5 16:30</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@RequestMapping(value = "/intelliScore")
@Api(value = "智能成绩API")
@RestController
public class IntelliScoreController {

    @Autowired
    private IntelliScoreService intelliScoreService;

    @GetMapping("/getAllGradeThreeScore")
    @ApiOperation(value = "通过学生ID得到联考、月考、预测成绩", notes = "")
    public List<IntelliScoreVO> getAllGradeThreeScore(@RequestParam Integer stuId) {
        return intelliScoreService.getAllGradeThreeScore(stuId);
    }
}
