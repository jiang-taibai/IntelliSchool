package com.dajiangsai.intellischoolweb.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * <p>创建时间：2021/3/5 23:28</p>
 * <p>主要功能：TODO</p>
 *
 * @author 太白
 */
@Controller
public class ConsumeInfoController {


    @GetMapping("/consumeInfo")
    public String getConsumeInfoPage() {
        return "消费信息";
    }

}
