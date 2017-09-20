package org.superbiz.api;

import javax.ws.rs.Path;

@Path("/api")
public class APIController {
    @Path("employees")
    public Employee employee() {
        return new Employee();
    }

    @Path("regex")
    public RegexController regex() {
        return new RegexController();
    }
}
