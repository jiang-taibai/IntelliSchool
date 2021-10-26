package com.dajiangsai.common.enums;

public enum NativePlaceEnum {
    // 萍乡、株洲、南平、武汉、吉安、宜春、新余
    Pingxiang("江西", "萍乡"),
    Zhuzhou("湖南", "株洲"),
    Nanping("福建", "南平"),
    Wuhan("湖北", "武汉"),
    Ji_an("江西", "吉安"),
    Yichun("江西", "宜春"),
    Xinyu("江西", "新余");

    public final String provice;
    public final String city;

    private NativePlaceEnum(String province, String city) {
        this.provice = province;
        this.city = city;
    }

    @Override
    public String toString() {
        return provice + "省" + city + "市";
    }
}
