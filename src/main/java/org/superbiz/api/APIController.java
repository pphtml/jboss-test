package org.superbiz.api;

import javax.inject.Inject;
import javax.ws.rs.Path;

@Path("/api")
public class APIController {
    @Inject
    private RegexController regexController;

    @Path("regex")
    public RegexController regex() {
        return regexController;
    }
}
