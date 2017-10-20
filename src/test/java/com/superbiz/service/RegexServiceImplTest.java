package com.superbiz.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.superbiz.service.ComputationExceededException;
import org.superbiz.service.RegexServiceImpl;
import org.superbiz.service.TaskExecutor;

import java.util.concurrent.Callable;
import java.util.concurrent.TimeoutException;

import static org.junit.jupiter.api.Assertions.assertEquals;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class RegexServiceImplTest {
    private RegexServiceImpl regexService = new RegexServiceImpl(new TaskExecutor() {
        @Override
        public <T> T compute(Callable<T> task, long timeout) throws TimeoutException {
            try {
                return task.call();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    });

    @Test
    public void markRegexOccurencesSimple() throws ComputationExceededException {
        final String result = regexService.markRegexOccurences("abc", "abc");
        assertEquals("<mark>abc</mark>", result);
    }

    @Test
    public void markRegexOccurencesEmptyRegex() throws ComputationExceededException {
        final String result = regexService.markRegexOccurences("", "Hello world!");
        assertEquals("Hello world!", result);
    }
}
