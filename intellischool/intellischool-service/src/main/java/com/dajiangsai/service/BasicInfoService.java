package com.dajiangsai.service;

import java.util.ArrayList;
import java.util.Map;

/**
 * <p>创建时间：2021/2/16 10:43</p>
 * <p>主要功能：TODO</p>
 *
 * @author 刘江
 */
public interface BasicInfoService {

    /**
     * 得到学生年龄分布，分别为15岁以下、16岁、17岁、18岁、19岁以及20岁以上的男女人数
     * key: 年龄
     * value:
     * -- key: 男/女
     * -- value: 人数
     */
    public Map<Integer, Map<String, Integer>> getStuAgeDistribution();

    /**
     * 得到学生人数比例，例如性别人数、住宿人数（这个暂不考虑，因为全部都住宿）、各年级人数、政治面貌人数、民族人数
     * key: 分类标题，取值：性别、住宿、各年级、政治面貌、民族
     * value:
     * -- key: 子标题，如性别分类中的子标题为 男/女
     * -- value: 该分类的子分类下的人数，如全校男生人数、全校女生人数
     */
    public Map<String, Map<String, Integer>> getStuRatio();

    /**
     * 得到各省学生的人数
     * key: 各省名称，如江西、湖南
     * value: 学生在各省的人数，如江西人数
     */
    public Map<String, Integer> getStuOriginInChina();

    /**
     * 得到江西省各市区学生的人数
     * key: 各市名称，如萍乡、南昌
     * value: 学生在各市区的人数，如萍乡人数
     */
    public Map<String, Integer> getStuOriginInJiangXiProvince();

    /**
     * 得到每个班的班级人数
     * key: 各班级的名称，如高一01班，高二11班等
     * value: 各班级的人数，如高一01班有47人
     */
    public Map<String, Integer> getStuCountPerClass();

    /**
     * 得到江西地图的Map Json文件
     */
    public String getMapJson(String fileName);
}
