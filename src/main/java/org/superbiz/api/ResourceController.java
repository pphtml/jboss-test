package org.superbiz.api;

import org.superbiz.util.ServerStartedAt;

import javax.inject.Inject;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Date;

public abstract class ResourceController {
    @Inject
    ServerStartedAt serverStartedAt;

    static class InputSource {
        private final InputStream inputStream;
        private final Date lastModified;

        private InputSource(final InputStream inputStream, final Date lastModified) {
            this.inputStream = inputStream;
            this.lastModified = lastModified;
        }

        public InputStream getInputStream() {
            return inputStream;
        }

        public Date getLastModified() {
            return lastModified;
        }
    }

    InputSource getResourceInputSource(String path) {
        final String resourcePath = "/static/" + path;
        final InputStream isFromWar = this.getClass().getClassLoader().getResourceAsStream(resourcePath);
        if (isFromWar == null) {
            try {
                final String filename = "src/main/resources" + resourcePath;
                final InputStream isFromFSSource = new FileInputStream(filename);
                final Path pathIO = Paths.get(filename);
                final BasicFileAttributes fileAttributes = Files.readAttributes(pathIO, BasicFileAttributes.class);
                return new InputSource(isFromFSSource, new Date(
                        fileAttributes.lastModifiedTime().toMillis() - fileAttributes.lastModifiedTime().toMillis() % 1000));
            } catch (java.io.IOException e) {
                InputStream isFromFSTarget = Object.class.getResourceAsStream(resourcePath);
                return new InputSource(isFromFSTarget, serverStartedAt.getStarted());
            }
        } else {
            return new InputSource(isFromWar, serverStartedAt.getStarted());
        }
    }

    private String convertStreamToString(InputStream is) {
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }
}
