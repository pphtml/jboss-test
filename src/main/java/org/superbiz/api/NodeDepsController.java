package org.superbiz.api;

import org.superbiz.util.MediaTypes;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class NodeDepsController {
    @GET
    @Produces(MediaTypes.JSON_ENCODED)
    public List<String> get() {
        final String filename = "src/main/frontend/node_modules";
        List<String> fileNames = new ArrayList<>();
        try {
            final DirectoryStream<Path> directoryStream = Files.newDirectoryStream(Paths.get(filename));
            for (Path path : directoryStream) {
                fileNames.add(path.toString());
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return fileNames;

        // node_modules/raw-body/README.md
    }
}
