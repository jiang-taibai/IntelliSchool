package com.dajiangsai.common.enums;

import com.dajiangsai.common.exception.EnumNotFoundException;

public enum SexEnum {
    MALE("男"), FEMALE("女"), ALL("男女");

    // 成员变量
    public final String name;

    // 构造方法
    private SexEnum(String sex) {
        this.name = sex;
    }

    public static <T> SexEnum getEnumByName(T val) throws EnumNotFoundException {
        for(SexEnum perEnum:SexEnum.values()) {
            if(perEnum.name.equals(val)) return perEnum;
        }
        throw new EnumNotFoundException("未找到name= " + val + " 的SexEnum对象！");
    }
}
