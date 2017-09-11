package org.superbiz.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import java.io.InputStream;

@Path("/{any : .*}")
public class SPAController {
    @GET
    @Produces(MediaType.TEXT_HTML)
    public Response get() {
        InputStream is = Object.class.getResourceAsStream("/static/index.html");
        ResponseBuilder response = Response.ok(is);
        return response.build();
    }
}
