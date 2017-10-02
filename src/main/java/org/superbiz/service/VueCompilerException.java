package org.superbiz.service;

public class VueCompilerException extends RuntimeException {
    public VueCompilerException(String message) {
        super(message);
    }

    public VueCompilerException(Throwable e) {
        super(e);
    }
}
