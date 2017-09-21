package org.superbiz.api;

import org.superbiz.model.TextMatchResult;
import org.superbiz.service.RegexService;
import org.superbiz.util.MediaTypes;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

@Stateless
public class RegexController {
    @Inject
    private RegexService regexService;

    @GET
    @Path("")
    @Produces(MediaTypes.JSON_ENCODED)
    public TextMatchResult hello(@QueryParam("regex") String regex, @QueryParam("text") String text) {
        String maskedText = regexService.markRegexOccurences(regex, text);
        return new TextMatchResult(maskedText);
    }
}
