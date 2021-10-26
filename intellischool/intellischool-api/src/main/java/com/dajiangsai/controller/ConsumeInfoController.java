package com.dajiangsai.controller;

import com.dajiangsai.common.enums.SexEnum;
import com.dajiangsai.common.exception.EnumNotFoundException;
import com.dajiangsai.service.ConsumeInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>创建时间：2021/2/19 11:43</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@RestController
@RequestMapping("/consumeInfo")
@Api(value = "消费信息API")
public class ConsumeInfoController {

    @Autowired
    private ConsumeInfoService consumeInfoService;

    @GetMapping(value = "/queryDailyConsume", produces = "text/html; charset=utf-8")
    @ApiOperation(value = "查询整一学期的每日 消费总金额与人均消费 ",
            notes = "key: 日期名称，格式为 MM/dd key.key: 当日消费信息标题，取值为 消费总额、人均消费 key.value: 当日消费信息，意为 当日消费总额、当日人均消费 当参数sexEnum为 SexEnum.MALE时只返回男生数据，为SexEnum.FEMALE时只返回女生数据 为 SexEnum.ALL时返回男女共同数据")
    public String queryDailyConsume(@RequestParam String sex) {
        /*
        Map<String, Map<String, Object>> res = new HashMap<>();
        try {
            SexEnum sexEnum = SexEnum.getEnumByName(sex);
            res = consumeInfoService.queryDailyConsume(sexEnum);
        } catch (EnumNotFoundException e) {
            e.printStackTrace();
            res.put("参数有误！", new HashMap<>());
        }
        return res;
        */
        // 效率过慢，现改为直接提取json文件
        File file = null;
        if(sex.equals(SexEnum.MALE.name)) {
            file = new File("C:\\src\\IntelliSchool\\json\\DailyConsume-M.json");
        } else if(sex.equals(SexEnum.FEMALE.name)) {
            file = new File("C:\\src\\IntelliSchool\\json\\DailyConsume-F.json");
        } else {
            file = new File("C:\\src\\IntelliSchool\\json\\DailyConsume-M&F.json");
        }
        StringBuilder sb = new StringBuilder();
        BufferedReader bufferedReader = null;
        try {
            //构造一个BufferedReader类来读取文件
            bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8));
            String line = null;
            //result用来存储文件内容
            //按使用readLine方法，一次读一行
            while ((line = bufferedReader.readLine()) != null) {
                // System.out.println(line);
                sb.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return sb.toString();
    }

}
