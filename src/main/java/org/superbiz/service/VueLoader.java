package org.superbiz.service;

import org.superbiz.util.InputSource;

public interface VueLoader {
    //VueParts loadComponent(InputSource inputSource);
    String compile(InputSource inputSource);
}
