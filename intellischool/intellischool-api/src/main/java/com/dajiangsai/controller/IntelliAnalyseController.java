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
@RequestMapping(value = "/intelliAnalyse", produces="text/html;charset=UTF-8")
@Api(value = "智能分析API")
@RestController
public class IntelliAnalyseController {

    @Autowired
    private IntelliAnalyseService intelliAnalyseService;

    @GetMapping("/getJsonFile")
    @ApiOperation(value = "通过名称得到json数据", notes = "json数据以字符串的形式返回")
    public String getJsonFile(String fileName) {
        return intelliAnalyseService.getJsonFile(fileName);
    }
}
