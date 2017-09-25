package org.superbiz.api;

import org.superbiz.model.Response;
import org.superbiz.util.MediaTypes;

import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;

@Stateless
public class ProcessorCountController {

    @GET
    @Produces(MediaTypes.JSON_ENCODED)
    public Response<Integer> hello() {
        return Response.of(Runtime.getRuntime().availableProcessors());
    }
}
