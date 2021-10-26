package com.dajiangsai.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p>创建时间：2021/2/16 14:27</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public class NativePlaceUtil {
    // 因为数据集中均是这种结构，所以暂且如此设计
    public static final String regx = "^(.*)省(.*)市$";

    public static String getProvince(String nativePlace) {
        Matcher matcher = Pattern.compile(regx).matcher(nativePlace);
        if(matcher.find()) {
            return matcher.group(1);
        }
        return "未知";
    }

    public static String getCity(String nativePlace) {
        Matcher matcher = Pattern.compile(regx).matcher(nativePlace);
        if(matcher.find()) {
            return matcher.group(2);
        }
        return "未知";
    }

    public static void main(String[] args) {
        String nativePlace = "江西省萍乡市";
        System.out.println(getProvince(nativePlace) + ", " + getCity(nativePlace));
    }
}
