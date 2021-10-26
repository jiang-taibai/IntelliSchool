package com.dajiangsai.service;

import com.alibaba.fastjson.JSONObject;

/**
 * <p>创建时间：2021/3/5 15:17</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public interface IntelliAnalyseService {

    /**
     * 提供某名字的json文件
     * @param fileName
     * @return
     */
    public String getJsonFile(String fileName);
}
