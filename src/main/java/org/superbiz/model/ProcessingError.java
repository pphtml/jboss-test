package org.superbiz.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.ws.rs.core.Response;

public class ProcessingError {
    private final ErrorCode errorCode;
    private final String errorMessage;
    private final String errorDetail;
    private final Response.Status statusCode;

    public ProcessingError(ErrorCode errorCode, String errorDetail, Response.Status statusCode) {
        this.errorCode = errorCode;
        this.errorMessage = errorCode.getMessage();
        this.errorDetail = errorDetail;
        this.statusCode = statusCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public String getErrorDetail() {
        return errorDetail;
    }

    @JsonIgnore
    public Response.Status getStatusCode() {
        return statusCode;
    }
}
