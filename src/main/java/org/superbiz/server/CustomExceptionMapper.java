package org.superbiz.server;

import org.superbiz.model.ProcessingError;
import org.superbiz.util.MediaTypes;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import static javax.ws.rs.core.Response.Status.INTERNAL_SERVER_ERROR;
import static org.superbiz.model.ErrorCode.EC_REG_UNKNOWN;

@Provider
public class CustomExceptionMapper implements ExceptionMapper<RuntimeException> {

    public static final String GENERIC_DETAIL = "If the problem persist, contact administrator for more details.";

    @Override
    public Response toResponse(RuntimeException exception) {
        org.superbiz.model.Response<Object> response = org.superbiz.model.Response.error(
                new ProcessingError(EC_REG_UNKNOWN, GENERIC_DETAIL, INTERNAL_SERVER_ERROR));
        return Response.status(INTERNAL_SERVER_ERROR)
                .entity(response)
                .type(MediaTypes.JSON_ENCODED).build();
    }
}
