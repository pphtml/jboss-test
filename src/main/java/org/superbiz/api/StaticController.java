package org.superbiz.api;

import org.superbiz.util.MediaTypes;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.io.InputStream;
import java.util.Optional;

@Path("/static/{path : .*}")
public class StaticController extends ResourceController {
    @GET
    public Response get(@PathParam("path") String path, @HeaderParam("Accept-Encoding") String acceptEncoding) {
        InputStream is = getResourceInputStream(path);
        if (is == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        } else {
            Optional<String> mediaType = MediaTypes.guessMimeType(path);
            Response.ResponseBuilder response = Response
                    .ok(is, mediaType.orElse(null));
            if (acceptEncoding != null && acceptEncoding.indexOf("gzip") > -1) {
                response.header("Content-Encoding", "gzip");
            }
            return response.build();
        }
    }
}
