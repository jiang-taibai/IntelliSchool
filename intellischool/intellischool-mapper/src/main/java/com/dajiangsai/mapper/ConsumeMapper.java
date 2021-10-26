package com.dajiangsai.mapper;

import com.dajiangsai.my.mapper.MyMapper;
import com.dajiangsai.pojo.Consume;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ConsumeMapper extends MyMapper<Consume> {

    public List<Consume> queryAClassConsume(@Param("classId") Integer classId);

}