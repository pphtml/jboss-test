package org.superbiz.server;

import org.superbiz.model.Response;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.logging.Logger;

@Provider
public class StatusFilter implements ContainerResponseFilter {
    @Inject
    Logger logger;

    @Override
    public void filter(final ContainerRequestContext containerRequestContext,
                       final ContainerResponseContext containerResponseContext) throws IOException {
        if (containerResponseContext.getStatus() == 200) {
            if (Response.class.equals(containerResponseContext.getEntityClass())) {
                Response response = (Response) containerResponseContext.getEntity();
                if (response.getError() != null) {
                    int statusCode = response.getError().getStatusCode() != null
                            ? response.getError().getStatusCode().getStatusCode()
                            : javax.ws.rs.core.Response.Status.BAD_REQUEST.getStatusCode();
                    containerResponseContext.setStatus(statusCode);
                }
            }
        }
    }
}
