package com.dajiangsai.service;

import com.dajiangsai.pojo.vo.IntelliScoreVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>创建时间：2021/3/7 11:11</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public interface IntelliScoreService {
    /**
     * 查询所有高三学生包括联考成绩
     * @param stuId
     * @return
     */
    public List<IntelliScoreVO> getAllGradeThreeScore(Integer stuId);
}
