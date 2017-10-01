package org.superbiz.util;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MediaTypes {
    public static final String JSON_ENCODED = "application/json; charset=utf-8";
    public static final String JAVASCRIPT = "application/javascript; charset=utf-8";

    private static final Map<String, String> mapping = new HashMap<>();

    static {
        mapping.put("css", "text/css");
        mapping.put("csv", "text/csv");
        mapping.put("gif", "image/gif");
        mapping.put("html", "text/html; charset=utf-8");
        mapping.put("ico", "image/x-icon");
        mapping.put("jpeg", "image/jpeg");
        mapping.put("js", "application/javascript");
        mapping.put("json", "application/json");
        mapping.put("png", "image/png");
        mapping.put("svg", "image/svg+xml");
        mapping.put("ttf", "font/ttf");
        mapping.put("woff", "font/woff");
        mapping.put("woff2", "font/woff2");
    }

    private static final Pattern SUFFIX_PATTERN = Pattern.compile(".*\\.(\\w+)");

    public static Optional<String> guessMimeType(String filename) {
        final Matcher matcher = SUFFIX_PATTERN.matcher(filename);
        if (matcher.find()) {
            final String suffix = matcher.group(1);
            String mimeType = mapping.get(suffix.toLowerCase());
            if (mimeType != null) {
                return Optional.of(mimeType);
            } else {
                return Optional.empty();
            }
        } else {
            return Optional.empty();
        }
    }
}
