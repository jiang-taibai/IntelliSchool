package com.dajiangsai.intellischoolweb.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * <p>创建时间：2021/3/8 3:33</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Controller
public class IntelliConsumeController {

    @GetMapping("/intelliConsume")
    public String getIntelliConsumePage() {
        return "Intelli消费";
    }
}
