package com.superbiz.service;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.superbiz.service.ComputationExceededException;
import org.superbiz.service.RegexService;
import org.superbiz.service.RegexServiceImpl;
import org.superbiz.service.TaskExecutor;

import java.util.concurrent.Callable;
import java.util.concurrent.TimeoutException;

import static org.junit.jupiter.api.Assertions.assertEquals;


//import org.junit.platform.runner.JUnitPlatform;
//import org.junit.runner.RunWith;
//
//@RunWith(JUnitPlatform.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class RegexServiceImplTest {
    private RegexServiceImpl regexService = new RegexServiceImpl();

    @BeforeAll
    public void init() {
//        this.regexService.taskExecutor = new TaskExecutor() {
//            @Override
//            public <T> T compute(Callable<T> task, long timeout) throws TimeoutException {
//                try {
//                    return task.call();
//                } catch (Exception e) {
//                    throw new RuntimeException(e);
//                }
//            }
//        };
    }

    @Test
    public void markRegexOccurencesSimple() throws ComputationExceededException {
        final String result = regexService.markRegexOccurences("abc", "abc");
        assertEquals("<mark>abc</mark>", result);
    }
}
