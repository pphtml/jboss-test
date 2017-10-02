package org.superbiz.model;

public class VueParts {
    private final String template;
    private final String script;
    private final String style;
    private final boolean empty;

    private VueParts(String template, String script, String style, boolean empty) {
        this.template = template;
        this.script = script;
        this.style = style;
        this.empty = empty;
    }

    public static VueParts of(String template, String script, String style) {
        return new VueParts(template, script, style, false);
    }

    public static VueParts empty() {
        return new VueParts(null, null, null, true);
    }

    public String getTemplate() {
        return template;
    }

    public String getScript() {
        return script;
    }

    public String getStyle() {
        return style;
    }

    public boolean isEmpty() {
        return empty;
    }
}
