package com.dajiangsai.common.enums;

public enum TermEnum {
    LastTerm("上学期"), NextTerm("下学期");

    public final String value;

    private TermEnum(String value) {
        this.value = value;
    }
}
