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
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    static {
        OBJECT_MAPPER
                .configure(JsonGenerator.Feature.QUOTE_FIELD_NAMES, false)
                .configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true)
                .configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
    }

    public String parse(final String scriptPart) {
        final Matcher matcher = VUE_SCRIPT_REGEX.matcher(scriptPart);
        if (matcher.find()) {
            final String componentJavascriptBody = matcher.group(1);
            try {
                Object json = OBJECT_MAPPER.readValue(componentJavascriptBody, Object.class);
                System.out.println(json);
                return null;
            } catch (IOException e) {
                throw new VueCompilerException(e);
            }
        } else {
            throw new VueCompilerException("<script> section of Vue component doesn't match expected format.");
        }
    }
}
