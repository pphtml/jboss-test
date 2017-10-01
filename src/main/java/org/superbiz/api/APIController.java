package org.superbiz.api;

import javax.inject.Inject;
import javax.ws.rs.Path;

@Path("/api")
public class APIController {
    @Inject
    private RegexController regexController;

    @Inject
    private ProcessorCountController processorCountController;

    @Inject
    private VueLoaderController vueLoaderController;

    @Path("regex")
    public RegexController regex() {
        return regexController;
    }

    @Path("proc-count")
    public ProcessorCountController processorCountController() {
        return processorCountController;
    }

    @Path("vue-loader")
    public VueLoaderController vueLoaderController() {
        return vueLoaderController;
    }
}
