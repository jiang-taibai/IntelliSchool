package com.dajiangsai.common.enums;

public enum ExamTypeEnum {
    Monthly("月考"), Midterm("期中考"), Final("期末考");

    public final String name;

    private ExamTypeEnum(String name) {
        this.name = name;
    }
}
