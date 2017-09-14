package org.superbiz.api;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import java.io.InputStream;

@Path("/{any : .*}")
public class SPAController extends ResourceController {
    @GET
    @Produces(MediaType.TEXT_HTML)
    public Response get(@HeaderParam("Accept-Encoding") String acceptEncoding) {
        InputStream is = getResourceInputStream("index.html");
        ResponseBuilder response = Response.ok(is);
        if (acceptEncoding != null && acceptEncoding.indexOf("gzip") > -1) {
            response.header("Content-Encoding", "gzip");
        }
        return response.build();
    }
}
