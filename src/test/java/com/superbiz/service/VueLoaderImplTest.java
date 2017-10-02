package com.superbiz.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.superbiz.service.VueLoaderImpl;
import org.superbiz.util.InputSource;
import org.superbiz.util.StaticResourceLoader;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class VueLoaderImplTest {
    private VueLoaderImpl vueLoader = new VueLoaderImpl();

    @Test
    public void loadComponent() {
        InputSource inputSource = StaticResourceLoader.load("static/js/test/components/ComponentA.vue");
        this.vueLoader.loadComponent(inputSource);
        //assertEquals("<mark>abc</mark>", result);
    }
}
