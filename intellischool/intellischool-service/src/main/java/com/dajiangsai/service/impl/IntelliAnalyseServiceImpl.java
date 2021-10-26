package com.dajiangsai.service.impl;

import com.dajiangsai.service.IntelliAnalyseService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * <p>创建时间：2021/3/5 15:18</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Service
@Slf4j
public class IntelliAnalyseServiceImpl implements IntelliAnalyseService {


    @Value("classpath:jsonData/intelliScore/Biology-Chemistry.json")
    private Resource BC;

    @Value("classpath:jsonData/intelliScore/Chemistry-Math.json")
    private Resource CM;

    @Value("classpath:jsonData/intelliScore/China-English.json")
    private Resource CE;

    @Value("classpath:jsonData/intelliScore/China-Geography.json")
    private Resource CG;

    @Value("classpath:jsonData/intelliScore/China-History.json")
    private Resource CH;

    @Value("classpath:jsonData/intelliScore/China-Politics.json")
    private Resource CP;

    @Value("classpath:jsonData/intelliScore/Physics-Chemistry.json")
    private Resource PC;

    @Value("classpath:jsonData/intelliScore/Physics-Math.json")
    private Resource PM;

    private Map<String, Resource> fileNameToResource = null;

    /**
     * 提供某名字的json文件
     *
     * @param fileName
     * @return
     */
    @Override
    public String getJsonFile(String fileName) {
        fileNameToResource = new HashMap<String, Resource>() {{
            put("Biology-Chemistry", BC);
            put("Chemistry-Math", CM);
            put("Chinese-English", CE);
            put("Chinese-Geography", CG);
            put("Chinese-History", CH);
            put("Chinese-Politics", CP);
            put("Physics-Chemistry", PC);
            put("Physics-Math", PM);
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
