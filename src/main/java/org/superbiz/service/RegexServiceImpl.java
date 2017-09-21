package org.superbiz.service;

import javax.ejb.Stateless;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Stateless
public class RegexServiceImpl implements RegexService {
    @Override
    public String markRegexOccurences(final String regex, final String text) {
        final Pattern compiledPattern = Pattern.compile(String.format(String.format("(%s)", regex)));
        final Matcher matcher = compiledPattern.matcher(text);
        final String result = matcher.replaceAll("<mark>$1</mark>");
        return result;
    }
}
