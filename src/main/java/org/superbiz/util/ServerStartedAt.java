package org.superbiz.util;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.enterprise.context.ApplicationScoped;
import java.util.Date;

@Singleton
@Startup
@ApplicationScoped
public class ServerStartedAt {
    private Date started;

    @PostConstruct
    private void initialize() {
        final long now = System.currentTimeMillis();
        final long nowRounded = now - now % 1000;
        this.started = new Date(nowRounded);
    }

    public Date getStarted() {
        return started;
    }
}
