package org.superbiz.api;

import org.superbiz.util.MediaTypes;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.EntityTag;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import java.io.InputStream;
import java.util.Date;
import java.util.Optional;
import java.util.logging.Logger;

@Path("/{path : .*}")
public class SPAController extends ResourceController {
    @Inject
    Logger logger;

    private static final CacheControl CACHE_CONTROL;

    static {
        final CacheControl cacheControl = new CacheControl();
        cacheControl.setMustRevalidate(true);
        cacheControl.setPrivate(true);
        cacheControl.setMaxAge(1);
        CACHE_CONTROL = cacheControl;
    }

    @GET
    public Response get(@HeaderParam("Accept-Encoding") String acceptEncoding,
                        @PathParam("path") String path,
                        @HeaderParam("If-Modified-Since") Date ifModifiedSince,
                        @Context Request request) {
        logger.info(String.format("SPAController, path: %s", path));

        InputSource inputSource = null;
        if (path.length() > 0) {
            // try to read other stuff than index.html
            inputSource = getResourceInputSource(path);
        }

        final String actualPath;
        // fallback to index.html
        logger.info(String.format("SPAController, inputSource: %s", inputSource));
        if (inputSource == null) {
            actualPath = "index.html";
            inputSource = getResourceInputSource(actualPath);
        } else {
            actualPath = path;
        }
//        if (ifModifiedSince != null
//                && ifModifiedSince.equals(inputSource.getLastModified())) {
//            // logger.info(ifModifiedSince.toString());
//            return Response.notModified().build();
//        }
        logger.info(String.format("SPAController, actualPath: %s", actualPath));
        final ResponseBuilder responseBuilder = request.evaluatePreconditions(inputSource.getLastModified());
        if (responseBuilder != null) {
            return responseBuilder
                    .cacheControl(CACHE_CONTROL)
                    .build();
        }
        Optional<String> mediaType = MediaTypes.guessMimeType(actualPath);
        ResponseBuilder response = Response.ok(inputSource.getInputStream(), mediaType.orElse(null));
        if (acceptEncoding != null && acceptEncoding.indexOf("gzip") > -1) {
            response.header("Content-Encoding", "gzip");
        }
//        EntityTag eTag = new EntityTag(Integer.valueOf(inputSource.getLastModified().hashCode()).toString());
        return response
                .lastModified(inputSource.getLastModified())
                //.tag(eTag)
                .cacheControl(CACHE_CONTROL)
                .build();
    }

//    private static String convertStreamToString(InputStream is) {
//        Scanner s = new Scanner(is).useDelimiter("\\A");
//        return s.hasNext() ? s.next() : "";
//    }
}
