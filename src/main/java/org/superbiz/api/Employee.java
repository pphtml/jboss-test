package org.superbiz.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

public class Employee {

    @GET
    @Path("hello")
    //@Produces(MediaType.APPLICATION_JSON)
    public String hello() {
        return "hello world";
    }
}

