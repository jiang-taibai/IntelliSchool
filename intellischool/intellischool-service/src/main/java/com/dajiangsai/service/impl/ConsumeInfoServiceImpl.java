package com.dajiangsai.service.impl;

import com.dajiangsai.common.enums.SexEnum;
import com.dajiangsai.common.utils.DateUtil;
import com.dajiangsai.mapper.ConsumeMapper;
import com.dajiangsai.mapper.StudentMapper;
import com.dajiangsai.pojo.Consume;
import com.dajiangsai.pojo.Student;
import com.dajiangsai.service.ConsumeInfoService;
import javafx.scene.input.InputMethodTextRun;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiConsumer;

/**
 * <p>创建时间：2021/2/19 11:16</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Service
public class ConsumeInfoServiceImpl implements ConsumeInfoService {

    @Autowired
    private ConsumeMapper consumeMapper;

    @Autowired
    private StudentMapper studentMapper;

    private List<Consume> consumes = null;

    /**
     * 查询整一学期的每日 消费总金额与人均消费
     * key: 日期名称，格式为 MM/dd
     * key.key: 当日消费信息标题，取值为 消费总额、人均消费、辅助值 消费人数
     * key.value: 当日消费信息，意为 当日消费总额、当日人均消费
     * <p>
     * 当参数sexEnum为 SexEnum.MALE时只返回男生数据，为SexEnum.FEMALE时只返回女生数据
     * 为 SexEnum.ALL时返回男女共同数据
     *
     * @param sexEnum
     */
    @Override
    public Map<String, Map<String, Object>> queryDailyConsume(SexEnum sexEnum) {
        Map<String, Map<String, Object>> res = new HashMap<>();

        if (consumes == null) {
            consumes = consumeMapper.selectAll();
        }
        Integer studentCount = 0;
        if(sexEnum.name.equals(SexEnum.ALL.name)) {
            studentCount = studentMapper.select(null).size();
        } else {
            Student student = new Student();
            student.setStuSex(sexEnum.name);
            studentCount = studentMapper.select(student).size();
        }
        consumes.stream()
                .filter(consume ->
                        sexEnum.name.equals(SexEnum.ALL.name) ||
                        consume.getStuSex().equals(sexEnum.name))
                .forEach(consume -> {
            String dateString = DateUtil.getString(consume.getContime(), DateUtil.MMdd_slash);
            Map<String, Object> sonRes =
                    res.getOrDefault(
                            dateString,
                            new HashMap<>()
                    );
            Integer totalConsumeStudent = (Integer) sonRes.getOrDefault("消费人数", 0);
            Double totalMoney = (Double) sonRes.getOrDefault("消费总额", 0.0);
            sonRes.put("消费总额", totalMoney + consume.getConmoney());
            sonRes.put("消费人数", totalConsumeStudent + 1);
            res.put(dateString, sonRes);
        });

        for (Map.Entry<String, Map<String, Object>> entry : res.entrySet()) {
            entry.getValue().put("消费人数", (Integer) entry.getValue().get("消费人数") / 3);
            entry.getValue().put("人均消费",
                    (Double) entry.getValue().get("消费总额") / (Integer) entry.getValue().get("消费人数"));
        }

        return res;
    }
}
