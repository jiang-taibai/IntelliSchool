package com.dajiangsai.common.enums;

public enum ResidenceTypeEnum {
    Rural("农村家庭"),Urban("城市家庭");

    public final String residenceType;

    private ResidenceTypeEnum(String residenceType) {
        this.residenceType = residenceType;
    }
}
