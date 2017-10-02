package org.superbiz.service;

import org.superbiz.model.VueParts;
import org.superbiz.util.InputSource;

import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class VueLoaderImpl implements VueLoader {
    private VueScriptParser vueScriptParser = new VueScriptParser();

    private static final Pattern VUE_CHUNKS_REGEX = Pattern.compile("(<template>[\\s\\S]*<\\/template>)\\s*" +
            "(<script>[\\s\\S]*<\\/script>)?\\s*" +
            "(<style[\\s\\S]*<\\/style>)?");

    public VueParts loadComponent(final InputSource inputSource) {
        //final InputStream is = this.getClass().getClassLoader().getResourceAsStream(componentResourcePath);
        final InputStream is = inputSource.getInputStream();

        final String body = convertStreamToString(is);
        final Matcher matcher = VUE_CHUNKS_REGEX.matcher(body);
        if (matcher.find()) {
            final String template = matcher.group(1);
            final String script = matcher.group(2);
            final String style = matcher.group(3);
            return VueParts.of(template, script, style);
        } else {
            return VueParts.empty();
        }
    }

    private String convertStreamToString(InputStream is) {
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }

    @Override
    public String compile(final InputSource inputSource) {
        final VueParts component = loadComponent(inputSource);
        final String scriptPart = component.getScript();
        final String parsedScript = vueScriptParser.parse(scriptPart);
        return parsedScript;
    }
}
