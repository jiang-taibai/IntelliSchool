package com.dajiangsai.controller;

import com.dajiangsai.service.IntelliConsumeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>创建时间：2021/3/8 0:02</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@RestController
@RequestMapping(value = "/intelliConsume", produces = "text/html;charset=UTF-8")
@Api(value = "智能消费API")
public class IntelliConsumeController {

    @Autowired
    private IntelliConsumeService intelliConsumeService;

    @GetMapping("/getTotalMoneyAndTimes")
    @ApiOperation(value = "得到用户智能分析的学生消费json数据", notes = "json数据以字符串的形式返回")
    public String getTotalMoneyAndTimes() {
        return intelliConsumeService.getTotalMoneyAndTimes();
    }
}
