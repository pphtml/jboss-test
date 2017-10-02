package org.superbiz.util;

import java.io.InputStream;
import java.util.Date;

public class InputSource {
    private final InputStream inputStream;
    private final Date lastModified;

    public InputSource(final InputStream inputStream, final Date lastModified) {
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
