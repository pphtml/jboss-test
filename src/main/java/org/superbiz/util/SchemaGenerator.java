package org.superbiz.util;

//import org.hibernate.cfg.Configuration;
//import org.hibernate.ejb.Ejb3Configuration;
//import org.hibernate.tool.hbm2ddl.SchemaExport;

import org.hibernate.jpa.AvailableSettings;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.io.IOException;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.util.Properties;


public class SchemaGenerator {
    //    public static void main(String[] args) {
//        Persistence.generateSchema("myapp-unit", null);
//    }

    public static void main(String[] args) throws IOException {
        //execute(args[0], args[1], Boolean.parseBoolean(args[2]), Boolean.parseBoolean(args[3]));
        execute("myapp-unit", "/tmp/schema.sql");
    }

// https://stackoverflow.com/questions/27314165/generate-ddl-script-at-maven-build-with-hibernate4-jpa-2-1

    public static void execute(String persistenceUnitName, String destination) {
        try {
            Path path = FileSystems.getDefault().getPath(destination);
            try {
                Files.delete(path);
            } catch (NoSuchFileException e) {
            }

            System.out.println("Generating DDL create script to : " + destination);

            final Properties persistenceProperties = new Properties();

            persistenceProperties.setProperty(org.hibernate.cfg.AvailableSettings.HBM2DDL_AUTO, "");
            persistenceProperties.setProperty("javax.persistence.schema-generation.database.action", "none");

            // XXX force persistence properties : define create script target from metadata to destination
            // persistenceProperties.setProperty(AvailableSettings.SCHEMA_GEN_CREATE_SCHEMAS, "true");
            persistenceProperties.setProperty("javax.persistence.schema-generation.scripts.action", "create");
            persistenceProperties.setProperty("javax.persistence.schema-generation.create-source", "metadata");
            persistenceProperties.setProperty("javax.persistence.schema-generation.scripts.create-target", destination);
            // persistenceProperties.put(AvailableSettings.HBM2DDL_DELIMITER, ";");
            // persistenceProperties.put("hibernate.hbm2ddl.delimiter", ";");


//        String systemLineSeparator = System.getProperty("line.separator");
//        System.setProperty("line.separator", ';' + systemLineSeparator);
//        // get a persistence provider from spring context
//        //entityManagerFactory.getJpaVendorAdapter().getPersistenceProvider().generateSchema(entityManagerFactory.getPersistenceUnitInfo(), persistenceProperties);
            //EntityManagerFactory emf = Persistence.createEntityManagerFactory(persistenceUnitName);
            Persistence.generateSchema(persistenceUnitName, persistenceProperties);

            String schema = new String(Files.readAllBytes(path));
            System.err.println(schema);

        } catch (IOException e) {
            e.printStackTrace();
        }



//        System.setProperty("line.separator", systemLineSeparator);
//        System.exit(0);
    }

}
