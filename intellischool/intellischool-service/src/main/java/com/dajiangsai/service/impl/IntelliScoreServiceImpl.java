package com.dajiangsai.service.impl;

import com.dajiangsai.mapper.IntelliScoreMapper;
import com.dajiangsai.pojo.vo.IntelliScoreVO;
import com.dajiangsai.service.IntelliScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>创建时间：2021/3/7 11:11</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Service
public class IntelliScoreServiceImpl implements IntelliScoreService {

    @Autowired
    private IntelliScoreMapper intelliScoreMapper;

    /**
     * 查询所有高三学生包括联考成绩
     *
     * @param stuId
     * @return
     */
    @Override
    public List<IntelliScoreVO> getAllGradeThreeScore(Integer stuId) {
        return intelliScoreMapper.queryAllGradeThreeScore(stuId);
    }
}
