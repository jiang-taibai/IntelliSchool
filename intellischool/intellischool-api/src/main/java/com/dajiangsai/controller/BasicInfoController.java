package com.dajiangsai.controller;

import com.dajiangsai.service.BasicInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * <p>创建时间：2021/2/16 11:36</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@RestController
@RequestMapping("/basicInfo")
@Api(value = "基本信息API")
public class BasicInfoController {

    @Autowired
    private BasicInfoService basicInfoService;

    @GetMapping("/getStuAgeDistribution")
    @ApiOperation(value = "得到学生年龄分布", notes="分别为15岁以下、16岁、17岁、18岁、19岁以及20岁以上的男女人数")
    public Map<Integer, Map<String, Integer>> getStuAgeDistribution() {
        return basicInfoService.getStuAgeDistribution();
    }

    @GetMapping("/getStuRatio")
    @ApiOperation(value = "得到学生人数比例", notes="例如性别人数、住宿人数（这个暂不考虑，因为全部都住宿）、各年级人数、政治面貌人数、民族人数")
    public Map<String, Map<String, Integer>> getStuRatio() {
        return basicInfoService.getStuRatio();
    }

    @GetMapping("/getStuOriginInChina")
    @ApiOperation(value = "得到各省学生的人数", notes="key: 各省名称，如江西、湖南, value: 学生在各省的人数，如江西人数")
    public Map<String, Integer> getStuOriginInChina() {
        return basicInfoService.getStuOriginInChina();
    }

    @GetMapping("/getStuOriginInJiangXiProvince")
    @ApiOperation(value = "得到江西省各市区学生的人数", notes="key: 各市名称，如萍乡、南昌, value: 学生在各市区的人数，如萍乡人数")
    public Map<String, Integer> getStuOriginInJiangXiProvince() {
        return basicInfoService.getStuOriginInJiangXiProvince();
    }

    @GetMapping("/getStuCountPerClass")
    @ApiOperation(value = "得到每个班的班级人数", notes="key: 各班级的名称，如高一01班，高二11班等, value: 各班级的人数，如高一01班有47人")
    public Map<String, Integer> getStuCountPerClass() {
        return basicInfoService.getStuCountPerClass();
    }

    @GetMapping(value = "/getMapJson", produces="text/html;charset=UTF-8")
    @ApiOperation(value = "通过文件名索引地图json文件")
    public String getMapJson(String fileName) {
        return basicInfoService.getMapJson(fileName);
    }
}
