package org.superbiz.service;

import org.superbiz.model.VueParts;

import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class VueLoaderImpl {
    private static final Pattern VUE_CHUNKS_REGEX = Pattern.compile("(<template>[\\s\\S]*<\\/template>)\\s*" +
            "(<script>[\\s\\S]*<\\/script>)?\\s*" +
            "(<style[\\s\\S]*<\\/style>)?");

    public VueParts loadComponent(final String componentResourcePath) {
        final InputStream is = this.getClass().getClassLoader().getResourceAsStream(componentResourcePath);

        String body = convertStreamToString(is);
        System.out.println(body);
        final Matcher matcher = VUE_CHUNKS_REGEX.matcher(body);
        if (matcher.find()) {
            final String template = matcher.group(1);
            final String script = matcher.group(2);
            final String style = matcher.group(3);
            System.out.println();
        }
        return new VueParts();
    }

    private String convertStreamToString(InputStream is) {
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }

}
