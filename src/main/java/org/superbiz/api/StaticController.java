package org.superbiz.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/static/{any : .*}")
public class StaticController {
    @GET
    public String get() {
        return "static";
    }
}
