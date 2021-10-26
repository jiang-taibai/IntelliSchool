package com.dajiangsai.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p>创建时间：2021/2/17 19:37</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public class ClassNameUtil {

    public static String getPureClassName(String className) {
        Matcher matcher = Pattern.compile("^(.*)级(.*)$").matcher(className);
        if(matcher.find()) {
            return matcher.group(2);
        }
        return "未知班级";
    }

}
