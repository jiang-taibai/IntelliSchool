package com.dajiangsai.common.utils;

import com.dajiangsai.common.enums.GradeEnum;
import com.dajiangsai.common.exception.EnumNotFoundException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p>创建时间：2021/2/17 19:51</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public class GradeNameUtil {

    public static String getPureGradeName(String name) {
        if(name.contains("高一")) return "高一";
        if(name.contains("高二")) return "高二";
        if(name.contains("高三")) return "高三";
        return "未知年级";
    }

    public static GradeEnum getPureGradeNameReturnEnum(String name) {

        try {
            return GradeEnum.getEnumByVal(getPureGradeName(name));
        } catch (EnumNotFoundException e) {
            e.printStackTrace();
        }

        return null;
    }

}
