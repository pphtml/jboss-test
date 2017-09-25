package org.superbiz.server;

import javax.script.ScriptEngineFactory;
import javax.script.ScriptEngineManager;
import java.util.List;

public class RunScriptFile {
    public static void main(String[] args) {
        ScriptEngineManager manager = new ScriptEngineManager();
        final List<ScriptEngineFactory> factories = manager.getEngineFactories();
        for (ScriptEngineFactory factory : factories) {
            System.out.println(String.format("%s: %s (%s)", factory.getEngineName(), factory.getLanguageName(), factory.getLanguageVersion()));
        }
    }
}
