package org.superbiz.model;

public class Response<T> {

    private final T result;
    private final ProcessingError processingError;

    public Response(T result, ProcessingError error) {
        this.result = result;
        this.processingError = error;
    }

    public static <T> Response<T> of(T result) {
        return new Response(result, null);
    }

    public static <T> Response<T> error(ProcessingError error) {
        return new Response(null, error);
    }

    public T getResult() {
        return result;
    }

    public ProcessingError getError() {
        return processingError;
    }
}
