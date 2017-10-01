package com.superbiz.service;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.superbiz.service.ComputationExceededException;
import org.superbiz.service.RegexServiceImpl;
import org.superbiz.service.VueLoaderImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class VueLoaderImplTest {
    private VueLoaderImpl vueLoader = new VueLoaderImpl();

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
    public void loadComponent() {
        this.vueLoader.loadComponent("static/js/test/components/ComponentA.vue");
        //assertEquals("<mark>abc</mark>", result);
    }
}
