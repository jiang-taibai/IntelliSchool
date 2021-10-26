package com.dajiangsai.common.enums;


import com.dajiangsai.common.exception.EnumNotFoundException;

/**
 * <p>创建时间：2021/2/10 21:22</p>
 * <p>主要功能：TODO</p>
 *
 * @author 刘江
 */
public enum SubjectEnum {
    Chinese("语文", 1, 150),
    Math("数学", 2, 150),
    English("英语", 3, 150),
    Physics("物理", 4, 100),
    Chemistry("化学", 5, 100),
    Biology("生物", 6, 100),
    Politics("政治", 7, 100),
    History("历史", 8, 100),
    Geography("地理", 9, 100);

    public final String name;
    public final int val;
    public final int score;

    private SubjectEnum(String name, int val, int score) {
        this.name = name;
        this.val = val;
        this.score = score;
    }

    public static SubjectEnum getEnumByVal(int val) throws EnumNotFoundException {
        for(SubjectEnum subjectEnum:SubjectEnum.values()) {
            if(subjectEnum.val == val) return subjectEnum;
        }
        throw new EnumNotFoundException("未找到val=" + val + "的SubjectEnum对象！");
    }
}
