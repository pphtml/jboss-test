package org.superbiz.api;

import javax.ws.rs.Path;

@Path("/api")
public class APIController {
    @Path("employees")
    public Employee employee() {
        return new Employee();
    }
}
