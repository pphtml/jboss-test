package org.superbiz.util;

import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Date;

public class StaticResourceLoader {
    private static final boolean devMode = getDevMode();

    public static InputSource load(final String path) {
        return load(path, null);
    }

    public static InputSource load(final String path, final Date defaultLastModified) {
        final String resourcePath = "/static/" + path;
        final InputStream isFromWar = StaticResourceLoader.class.getClassLoader().getResourceAsStream(resourcePath);
        if (devMode || isFromWar == null) {
            try {
                final String filename = "src/main/resources" + resourcePath;
                final InputStream isFromFSSource = new FileInputStream(filename);
                final Path pathIO = Paths.get(filename);
                final BasicFileAttributes fileAttributes = Files.readAttributes(pathIO, BasicFileAttributes.class);
                return new InputSource(isFromFSSource, new Date(
                        fileAttributes.lastModifiedTime().toMillis() - fileAttributes.lastModifiedTime().toMillis() % 1000));
            } catch (java.io.IOException e) {
                InputStream isFromFSTarget = Object.class.getResourceAsStream(resourcePath);
                return new InputSource(isFromFSTarget, defaultLastModified);
            }
        } else {
            return new InputSource(isFromWar, defaultLastModified);
        }
    }

    private static boolean getDevMode() {
        String devMode = System.getProperty("getDevMode", "true");
        return "true".equalsIgnoreCase(devMode);
    }
}
