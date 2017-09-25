package org.superbiz.service;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.logging.Logger;

@Stateless
@ApplicationScoped
public class RegexCPU {
    @Inject
    Logger logger;

    private ExecutorService executor;

    @PostConstruct
    public void initialize() {
        logger.info("Before Executor Pool initialized");
        executor = Executors.newFixedThreadPool(1);
        logger.info("After Executor Pool initialized");
    }

    public <T> T compute(Callable<T> task, long timeout) throws TimeoutException {
        try {
            final Future<T> future = executor.submit(task);
            return future.get(timeout, TimeUnit.MILLISECONDS);
        } catch (TimeoutException e) {
            throw new RuntimeException(e);
            //throw e;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}
