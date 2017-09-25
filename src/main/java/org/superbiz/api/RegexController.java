package org.superbiz.api;

import org.superbiz.model.ErrorCode;
import org.superbiz.model.ProcessingError;
import org.superbiz.model.Response;
import org.superbiz.model.TextMatchResult;
import org.superbiz.service.ComputationExceededException;
import org.superbiz.service.RegexService;
import org.superbiz.util.MediaTypes;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

@Stateless
public class RegexController {
    @Inject
    private RegexService regexService;

    @GET
    @Produces(MediaTypes.JSON_ENCODED)
    public Response<TextMatchResult> markOccurences(@QueryParam("regex") String regex, @QueryParam("text") String text) {
        try {
            String maskedText = regexService.markRegexOccurences(regex, text);
            return Response.of(new TextMatchResult(maskedText));
        } catch (IllegalArgumentException e) {
            return Response.error(new ProcessingError(ErrorCode.EC_REG_MISSING_ARGUMENT,
                    e.getMessage(),
                    javax.ws.rs.core.Response.Status.BAD_REQUEST
            ));
        } catch (ComputationExceededException e) {
            return Response.error(new ProcessingError(ErrorCode.EC_REG_COMPUTATION_EXCEEDED,
                    e.getMessage(),
                    javax.ws.rs.core.Response.Status.FORBIDDEN));
        }
    }
}
