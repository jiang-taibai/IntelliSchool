package com.dajiangsai.common.enums;

public enum YesOrNoEnum {
    YES("是"), NO("否");

    public final String value;

    private YesOrNoEnum(String value) {
        this.value = value;
    }
}
