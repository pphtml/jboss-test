package org.superbiz.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexController {
    @GET
    @Path("{regex}/{sampleText}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> hello(@PathParam("regex") String regex, @PathParam("sampleText") String sampleText) {
        final Pattern compiledPattern = Pattern.compile(regex);
        final Matcher matcher = compiledPattern.matcher(sampleText);
        List<String> result = new ArrayList<>();
        while (matcher.find()) {
            result.add(matcher.group());
        }
        return result;
    }
}
