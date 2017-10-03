package org.superbiz.service;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class VueScriptParser {
    private static final Pattern VUE_SCRIPT_REGEX =
            Pattern.compile("<script>\\s*export\\s+default\\s*(\\{[\\s\\S]*})\\s*</script>");
    private static final Pattern VUE_EXTRACT_NAME_REGEX =
            Pattern.compile("([\\s\\S]*)(name\\s*:\\s*'([\\s\\S]*?)')([\\s\\S]*)");
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    static {
        OBJECT_MAPPER
                .configure(JsonGenerator.Feature.QUOTE_FIELD_NAMES, false)
                .configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true)
                .configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
    }

    public String parse(final String scriptPart, final String template) {
        final Matcher matcher = VUE_SCRIPT_REGEX.matcher(scriptPart);
        if (matcher.find()) {
            final String componentJavascriptBody = matcher.group(1);
            Matcher jsBodyPartsMatcher = VUE_EXTRACT_NAME_REGEX.matcher(componentJavascriptBody);
            if (jsBodyPartsMatcher.find()) {
                String start = jsBodyPartsMatcher.group(1);
                String end = jsBodyPartsMatcher.group(4);
                String name = jsBodyPartsMatcher.group(2);

                String modifiedBody = String.format("%stemplate: `%s`%s", start, template, end);

                String component = String.format("Vue.component('%s', %s);\n", name, modifiedBody);
                return component;
            } else {
                throw new VueCompilerException("Vue component doesn't contain name attribute.");
            }
        } else {
            throw new VueCompilerException("<script> section of Vue component doesn't match expected format.");
        }
    }
}
