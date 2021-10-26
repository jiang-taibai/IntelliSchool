package com.dajiangsai.service.impl;

import com.dajiangsai.common.utils.ClassNameUtil;
import com.dajiangsai.mapper.ClassInfoMapper;
import com.dajiangsai.mapper.ScoreRankMapper;
import com.dajiangsai.pojo.vo.ClassInfoVO;
import com.dajiangsai.pojo.vo.ScoreInfoVO;
import com.dajiangsai.pojo.vo.ScoreRankVO;
import com.dajiangsai.pojo.vo.TotalScoreRankVO;
import com.dajiangsai.service.ScoreRankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.prefs.InvalidPreferencesFormatException;

/**
 * <p>创建时间：2021/2/17 19:11</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Service
public class ScoreRankServiceImpl implements ScoreRankService {

    @Autowired
    private ScoreRankMapper scoreRankMapper;
    @Autowired
    private ClassInfoMapper classInfoMapper;


    /**
     * 得到某次考试某学科的班内学生的班排名、校排名情况
     * key: 学科名称
     * value.key: 班级名称
     * value.value: 某班级某学科的排名情况
     * <p>
     * 先遍历校排名情况，再分班处理加入校排名情况
     */
    @Override
    public Map<String, ArrayList<ScoreRankVO>> querySubjectRank(Integer examId, Integer subjectId) {
        Map<String, ArrayList<ScoreRankVO>> res = new LinkedHashMap<>();
        // 查找校排名 #{paramasMap.exam_id} #{paramasMap.exam_subject}
        Map<String, Object> queryRankInSchoolMap = new HashMap<>();
        queryRankInSchoolMap.put("exam_id", examId);
        queryRankInSchoolMap.put("exam_subject", subjectId);
        List<ScoreInfoVO> scoreInfosInSchool = scoreRankMapper.queryRankInSchool(queryRankInSchoolMap);
        int currRank = 0;
        double preScore = -100.0;
        // 存储校排名的map
        Map<Integer, Integer> rankInSchoolMap = new HashMap<>();
        for (ScoreInfoVO info : scoreInfosInSchool) {
            if (preScore != info.getExam_score()) currRank++;
            rankInSchoolMap.put(info.getStu_id(), currRank);
            preScore = info.getExam_score();
        }

        Map<String, Object> queryRankInClassMap = new HashMap<>();
        queryRankInClassMap.put("exam_id", examId);
        queryRankInClassMap.put("exam_subject", subjectId);
        List<ClassInfoVO> classInfos = classInfoMapper.queryClassInfo();
        //#{paramasMap.exam_id} #{paramasMap.exam_subject} #{paramasMap.class_id}
        for (ClassInfoVO classInfo : classInfos) {
            currRank = 0;
            preScore = -100.0;
            queryRankInClassMap.put("class_id", classInfo.getClass_id());
            List<ScoreInfoVO> scoreInfosInClass = scoreRankMapper.queryRankInClass(queryRankInClassMap);
            ArrayList<ScoreRankVO> scoreRankVOList = new ArrayList<>();
            for (ScoreInfoVO info : scoreInfosInClass) {
                ScoreRankVO scoreRankVO = new ScoreRankVO();
                scoreRankVO.setScore(info.getExam_score());
                if (preScore != info.getExam_score()) currRank++;
                scoreRankVO.setClassRank(currRank);
                scoreRankVO.setSchoolRank(rankInSchoolMap.get(info.getStu_id()));
                scoreRankVOList.add(scoreRankVO);
            }
            if (!scoreRankVOList.isEmpty())
                res.put(ClassNameUtil.getPureClassName(classInfo.getClass_name()), scoreRankVOList);
        }
        return res;
    }

    /**
     * 查询某次考试班级的校内总分排名情况
     * key: 班级名称
     * value: 班内所有学生的总分班排名与校排名
     */
    @Override
    public Map<String, ArrayList<ScoreRankVO>> querySumSubjectRank(Integer examId) {
        Map<String, ArrayList<ScoreRankVO>> res = new HashMap<>();
        // 查找校排名 #{paramasMap.exam_id} #{paramasMap.exam_subject}
        Map<String, Object> queryRankInSchoolMap = new HashMap<>();
        queryRankInSchoolMap.put("exam_id", examId);
        List<TotalScoreRankVO> scoreInfosInSchool = scoreRankMapper.queryTotalRankInSchool(queryRankInSchoolMap);
        int currRank = 0;
        double preScore = -100.0;
        // 存储校排名的map
        Map<Integer, Integer> rankInSchoolMap = new HashMap<>();
        for (TotalScoreRankVO info : scoreInfosInSchool) {
            if (preScore != info.getTotal_score()) currRank++;
            rankInSchoolMap.put(info.getStu_id(), currRank);
            preScore = info.getTotal_score();
        }

        Map<String, Object> queryRankInClassMap = new HashMap<>();
        queryRankInClassMap.put("exam_id", examId);
        List<ClassInfoVO> classInfos = classInfoMapper.queryClassInfo();
        //#{paramasMap.exam_id} #{paramasMap.exam_subject} #{paramasMap.class_id}
        for (ClassInfoVO classInfo : classInfos) {
            currRank = 0;
            preScore = -100.0;
            queryRankInClassMap.put("class_id", classInfo.getClass_id());
            List<TotalScoreRankVO> scoreInfosInClass = scoreRankMapper.queryTotalRankInClass(queryRankInClassMap);
            ArrayList<ScoreRankVO> scoreRankVOList = new ArrayList<>();
            for (TotalScoreRankVO info : scoreInfosInClass) {
                ScoreRankVO scoreRankVO = new ScoreRankVO();
                scoreRankVO.setScore(info.getTotal_score());
                if (preScore != info.getTotal_score()) currRank++;
                scoreRankVO.setClassRank(currRank);
                scoreRankVO.setSchoolRank(rankInSchoolMap.get(info.getStu_id()));
                scoreRankVOList.add(scoreRankVO);
            }
            if (!scoreRankVOList.isEmpty())
                res.put(ClassNameUtil.getPureClassName(classInfo.getClass_name()), scoreRankVOList);
        }
        return res;
    }
}
