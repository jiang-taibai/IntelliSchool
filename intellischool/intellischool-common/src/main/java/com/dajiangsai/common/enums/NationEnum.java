package com.dajiangsai.common.enums;

public enum NationEnum {
    //汉族、壮族、回族、满族、维吾尔族、苗族、彝族、土家族、藏族、蒙古族
    Han("汉族"),
    Zhuang("壮族"),
    Hui("回族"),
    Manchu("满族"),
    Uygur("维吾尔族"),
    Miao("苗族"),
    Yi("彝族"),
    Tujia("土家族"),
    Tibetan("藏族"),
    Mongolian("蒙古族");

    private String nation;

    private NationEnum(String nation) {
        this.nation = nation;
    }

    @Override
    public String toString() {
        return nation;
    }

}
