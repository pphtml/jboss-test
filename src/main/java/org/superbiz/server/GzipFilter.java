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
public class GzipFilter implements ContainerResponseFilter {
    @Inject
    Logger logger;

    @Override
    public void filter(ContainerRequestContext containerRequestContext, ContainerResponseContext containerResponseContext) throws IOException {
        final String acceptEncoding = containerRequestContext.getHeaderString("Accept-Encoding");
        if (acceptEncoding != null && acceptEncoding.indexOf("gzip") > -1) {
            containerResponseContext.getHeaders().add("Content-Encoding", "gzip");
        }
    }
}

