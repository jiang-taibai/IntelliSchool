package com.dajiangsai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.SpringServletContainerInitializer;
import tk.mybatis.spring.annotation.MapperScan;

/**
 * <p>创建时间：2021/2/16 9:09</p>
 * <p>主要功能：TODO</p>
 *
 * @author 刘江
 */
public class WarStarterApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // 添加指向Application的SpringBoot启动类
        return builder.sources(Application.class);
    }

}
