package com.dajiangsai.common.enums;

import com.dajiangsai.common.exception.EnumNotFoundException;

/**
 * <p>创建时间：2021/2/17 19:41</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public enum GradeEnum {
    SeniorOne("高一", 1),
    SeniorTwo("高二", 2),
    SeniorThree("高三", 3);

    private final String name;
    private final Integer val;

    private GradeEnum(String name, Integer val) {
        this.name = name;
        this.val = val;
    }

    public static <T> GradeEnum getEnumByVal(T val) throws EnumNotFoundException {
        for(GradeEnum gradeEnum:GradeEnum.values()) {
            if(gradeEnum.val == val || gradeEnum.name.equals(val)) return gradeEnum;
        }
        throw new EnumNotFoundException("未找到val=" + val + "的GradeEnum对象！");
    }
}
