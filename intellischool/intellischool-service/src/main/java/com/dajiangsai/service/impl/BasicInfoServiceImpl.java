package com.dajiangsai.service.impl;

import com.dajiangsai.common.enums.SexEnum;
import com.dajiangsai.common.utils.NativePlaceUtil;
import com.dajiangsai.mapper.StudentMapper;
import com.dajiangsai.pojo.Student;
import com.dajiangsai.service.BasicInfoService;
import com.dajiangsai.common.utils.DateUtil;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p>创建时间：2021/2/16 11:09</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Service
public class BasicInfoServiceImpl implements BasicInfoService {

    @Autowired
    private StudentMapper studentMapper;

    /**
     * 所有学生列表
     */
    private List<Student> students;

    /**
     * 得到学生年龄分布，分别为15岁以下、16岁、17岁、18岁、19岁以及20岁以上的男女人数
     * key: 年龄
     * value:
     * -- key: 男/女
     * -- value: 人数
     */
    @Transactional(propagation = Propagation.SUPPORTS)
    @Override
    public Map<Integer, Map<String, Integer>> getStuAgeDistribution() {
        if (students == null) {
            students = studentMapper.selectAll();
        }
        Map<Integer, Map<String, Integer>> result = new HashMap<>();
        for (int age = 15; age <= 20; ++age) {
            result.put(age, new HashMap<>());
            result.get(age).put(SexEnum.MALE.name, 0);
            result.get(age).put(SexEnum.FEMALE.name, 0);
        }
        students.forEach(student -> {
            int age = DateUtil.getAgeByBirth(student.getStuBorndate());
            if (age <= 15) age = 15;
            else if (age >= 20) age = 20;
            int count = result.get(age).get(student.getStuSex()) + 1;
            result.get(age).put(student.getStuSex(), count);
        });
        return result;
    }

    /**
     * 得到学生人数比例，例如性别人数、住宿人数（这个暂不考虑，因为全部都住宿）、各年级人数、政治面貌人数、民族人数
     * key: 分类标题，取值：性别、住宿、各年级、政治面貌、民族
     * value:
     * -- key: 子标题，如性别分类中的子标题为 男/女
     * -- value: 该分类的子分类下的人数，如全校男生人数、全校女生人数
     */
    @Override
    public Map<String, Map<String, Integer>> getStuRatio() {
        if (students == null) {
            students = studentMapper.selectAll();
        }
        Map<String, Map<String, Integer>> result = new HashMap<>();
        result.put("性别人数", new HashMap<>());
        // result.put("住宿人数", new HashMap<>());
        result.put("年级人数", new HashMap<>());
        result.put("政治面貌", new HashMap<>());
        result.put("民族人数", new HashMap<>());

        // 性别统计
        Map<String, Integer> sexCount = result.get("性别人数");
        sexCount.put(SexEnum.MALE.name, 0);
        sexCount.put(SexEnum.FEMALE.name, 0);
        students.forEach(student -> {
            int count = sexCount.get(student.getStuSex()) + 1;
            sexCount.put(student.getStuSex(), count);
        });
        result.put("性别人数", sexCount);

        // 住宿人数统计
        // pass...

        // 年级人数统计
        Map<String, Integer> gradeCount = result.get("年级人数");
        gradeCount.put("高一", 0);
        gradeCount.put("高二", 0);
        gradeCount.put("高三", 0);
        students.forEach(student -> {
            int grade = (student.getClassId() / 100) % 100;
            switch (grade) {
                case 1:
                    gradeCount.put("高一", gradeCount.get("高一") + 1);
                case 2:
                    gradeCount.put("高二", gradeCount.get("高二") + 1);
                case 3:
                    gradeCount.put("高三", gradeCount.get("高三") + 1);
            }
        });
        result.put("年级人数", gradeCount);

        // 政治面貌
        Map<String, Integer> politicsCount = result.get("政治面貌");
        students.forEach(student -> {
            String politics = student.getStuPolicy();
            politicsCount.put(politics, politicsCount.getOrDefault(politics, 0) + 1);
        });
        result.put("政治面貌", politicsCount);

        // 民族人数
        Map<String, Integer> nationCount = result.get("民族人数");
        students.forEach(student -> {
            String nation = student.getStuNation();
            nationCount.put(nation, nationCount.getOrDefault(nation, 0) + 1);
        });
        result.put("民族人数", nationCount);

        return result;
    }

    /**
     * 得到各省学生的人数
     * key: 各省名称，如江西、湖南
     * value: 学生在各省的人数，如江西人数
     */
    @Override
    public Map<String, Integer> getStuOriginInChina() {
        if (students == null) {
            students = studentMapper.selectAll();
        }
        Map<String, Integer> res = new HashMap<>();
        students.forEach(student -> {
            String province = NativePlaceUtil.getProvince(student.getStuNativeplace());
            res.put(province, res.getOrDefault(province, 0) + 1);
        });
        return res;
    }

    /**
     * 得到江西省各市区学生的人数
     * key: 各市名称，如萍乡、南昌
     * value: 学生在各市区的人数，如萍乡人数
     */
    @Override
    public Map<String, Integer> getStuOriginInJiangXiProvince() {
        if (students == null) {
            students = studentMapper.selectAll();
        }
        Map<String, Integer> res = new HashMap<>();
        students.forEach(student -> {
            String city = NativePlaceUtil.getCity(student.getStuNativeplace());
            res.put(city, res.getOrDefault(city, 0) + 1);
        });
        return res;
    }

    /**
     * 得到每个班的班级人数
     * key: 各班级的名称，如高一01班，高二11班等
     * value: 各班级的人数，如高一01班有47人
     */
    @Override
    public Map<String, Integer> getStuCountPerClass() {
        if (students == null) {
            students = studentMapper.selectAll();
        }
        Map<String, Integer> res = new HashMap<>();
        students.forEach(student -> {
            String classFullName = student.getClassName();
            Matcher matcher = Pattern.compile("^(.*)级(.*)$").matcher(classFullName);
            String classPureName = "未知";
            if (matcher.find()) {
                classPureName = matcher.group(2);
            }
            res.put(classPureName, res.getOrDefault(classPureName, 0) + 1);
        });
        return res;
    }

    @Value("classpath:jsonData/basicInfo/360000_full.json")
    private Resource jiangXiMapJson;
    private Map<String, Resource> fileNameToResource = null;

    /**
     * 得到江西地图的Map Json文件
     *
     * @param fileName
     */
    @Override
    public String getMapJson(String fileName) {
        fileNameToResource = new HashMap<String, Resource>() {{
            put("360000_full", jiangXiMapJson);
        }};
        try {
            String areaData = IOUtils.toString(fileNameToResource.get(fileName).getInputStream(), StandardCharsets.UTF_8);
            return areaData;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
