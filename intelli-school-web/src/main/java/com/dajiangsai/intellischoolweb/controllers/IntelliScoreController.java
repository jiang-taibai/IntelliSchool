package com.dajiangsai.intellischoolweb.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * <p>创建时间：2021/3/5 23:31</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Controller
public class IntelliScoreController {

    @GetMapping("/intelliScore")
    public String getIntelliScorePage() {
        return "Intelli预测";
    }


}
