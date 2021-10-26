package com.dajiangsai.common.enums;

public enum PolicyEnum {
    League("共青团员"), Masses("群众");

    public final String policy;

    private PolicyEnum(String policy) {
        this.policy = policy;
    }
}
