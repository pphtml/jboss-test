package org.superbiz.util;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import java.util.logging.Logger;

public class LoggerProducer {
    @Produces
    public Logger producer(InjectionPoint ip){
        return Logger.getLogger(ip.getMember().getDeclaringClass().getName());
    }
}
