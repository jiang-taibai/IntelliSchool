package com.dajiangsai.service.impl;

import com.dajiangsai.service.IntelliConsumeService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * <p>创建时间：2021/3/7 23:59</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Service
public class IntelliConsumeServiceImpl implements IntelliConsumeService {

    @Value("classpath:jsonData/IntelliConsume/needy_student_data4.json")
    private Resource consumeJson;

    /**
     * 得到消费总额与消费次数
     *
     * @return
     */
    @Override
    public String getTotalMoneyAndTimes() {
        try {
            String areaData = IOUtils.toString(consumeJson.getInputStream(), StandardCharsets.UTF_8);
            return areaData;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
