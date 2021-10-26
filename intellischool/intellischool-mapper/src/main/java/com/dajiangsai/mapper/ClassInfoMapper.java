package com.dajiangsai.mapper;

import com.dajiangsai.pojo.vo.ClassInfoVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>创建时间：2021/2/18 16:06</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
public interface ClassInfoMapper {

    /**
     * 查询班级ID名称对应关系
     */
    public List<ClassInfoVO> queryClassInfo();

    /**
     * 查询某班人数
     */
    public Integer queryClassSize(@Param("classId") Integer classId);
}
