package org.superbiz.util;

import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class WebpackProcess {
    private static final Logger logger = Logger.getLogger(WebpackProcess.class.getName());

    public static void main(String[] args) throws IOException, InterruptedException {
        runWebpack();
//        new StreamGobbler(p.getErrorStream()).start();
//        new StreamGobbler(p.getInputStream()).start();
    }

    public static void runWebpack() throws InterruptedException, IOException {
        new ProcessBuilder()
                .command("node/node",
                        "node_modules/webpack/bin/webpack.js",
                        "--watch")
                .inheritIO()
                .directory(new File("src/main/frontend"))
                .start()
                .waitFor();
    }

    public static void runWebpackLoop() {
        logger.info("Starting Webpack process");

        // TODO loop is missing
        try {
            runWebpack();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
            logger.log(Level.SEVERE, "Webpack process stopped", e);
        }
    }
}
