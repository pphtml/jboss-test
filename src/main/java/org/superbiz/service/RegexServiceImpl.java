package org.superbiz.service;

import javax.ejb.Stateless;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeoutException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Stateless
@ApplicationScoped
public class RegexServiceImpl implements RegexService {
    TaskExecutor taskExecutor;

    @Inject
    public RegexServiceImpl(TaskExecutor taskExecutor) {
        this.taskExecutor = taskExecutor;
    }

    private static final long TIMEOUT = 200;

    @Override
    public String markRegexOccurences(final String regex, final String text) throws ComputationExceededException {
        if (regex == null) {
            throw new IllegalArgumentException("Regex argument must be provided");
        }

        if (text == null) {
            throw new IllegalArgumentException("Text argument must be provided");
        }

        Callable<String> task = () -> {
            final Pattern compiledPattern = Pattern.compile(String.format(String.format("(%s)", regex)));
            final Matcher matcher = compiledPattern.matcher(text);
            final String result = matcher.replaceAll("<mark>$1</mark>");
            return result;
        };

        try {
            String result = taskExecutor.compute(task, TIMEOUT);
            return result;
        } catch (TimeoutException e) {
            throw new ComputationExceededException(String.format("Timeout %d exceeded for matching of " +
                    "regex: %s\non text: %s", TIMEOUT, regex, text));
        }
    }
}
