package org.superbiz.api;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

public abstract class ResourceController {
    InputStream getResourceInputStream(String path) {
        final String resourcePath = "/static/" + path;
        final InputStream isFromWar = this.getClass().getClassLoader().getResourceAsStream(resourcePath);
        if (isFromWar == null) {
            try {
                InputStream isFromFSSource = new FileInputStream("src/main/resources" + resourcePath);
                return isFromFSSource;
            } catch (FileNotFoundException e) {
                InputStream isFromFSTarget = Object.class.getResourceAsStream(resourcePath);
                return isFromFSTarget;
            }
        } else {
            return isFromWar;
        }
    }

    private String convertStreamToString(InputStream is) {
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }
}
