package org.superbiz.api;

import org.superbiz.util.MediaTypes;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import java.util.Date;

public class VueLoaderController extends ResourceController {
    @GET
    @Path("{path : .+}")
    public Response get(@PathParam("path") final String path,
                        @HeaderParam("If-Modified-Since") final Date ifModifiedSince,
                        @Context final Request request) {
        final String componentPath = String.format("js/components/%s", path);
        final InputSource inputSource = getResourceInputSource(componentPath);
//        final Response.ResponseBuilder responseBuilder = request.evaluatePreconditions(inputSource.getLastModified());
//        if (responseBuilder != null) {
//            return responseBuilder
//                    .cacheControl(CACHE_CONTROL)
//                    .build();
//        }
//        Optional<String> mediaType = MediaTypes.guessMimeType(actualPath);
        Response.ResponseBuilder response = Response.ok(inputSource.getInputStream(), MediaTypes.JAVASCRIPT);
        return response
//                .lastModified(inputSource.getLastModified())
//                .cacheControl(CACHE_CONTROL)
                .build();
    }
}
