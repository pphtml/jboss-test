package org.superbiz.model;

public enum ErrorCode {
    EC_REG_MISSING_ARGUMENT("Missing argument");

    private final String message;

    ErrorCode(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
