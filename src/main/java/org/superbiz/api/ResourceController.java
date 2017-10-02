package org.superbiz.api;

import org.superbiz.util.InputSource;
import org.superbiz.util.ServerStartedAt;
import org.superbiz.util.StaticResourceLoader;

import javax.inject.Inject;
import java.io.InputStream;

public abstract class ResourceController {
    @Inject
    ServerStartedAt serverStartedAt;

    InputSource getResourceInputSource(String path) {
        return StaticResourceLoader.load(path, serverStartedAt.getStarted());
    }

    private String convertStreamToString(InputStream is) {
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }
}
