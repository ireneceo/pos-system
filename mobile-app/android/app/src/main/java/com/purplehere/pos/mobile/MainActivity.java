package com.purplehere.pos.mobile;

import android.os.Bundle;
import android.util.Log;
import android.view.WindowManager;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.WebViewListener;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Register the custom native print plugin BEFORE the bridge initializes
        // so window.Capacitor.Plugins.NativePrint is available to the remote page
        // (design §7-5). nativePrintBridge.js then maps it onto __NATIVE_PRINT.
        registerPlugin(NativePrintPlugin.class);
        super.onCreate(savedInstanceState);

        // Inject the __NATIVE_PRINT bridge on EVERY page load, registered here in
        // onCreate — NOT in the plugin's load() — because Plugin.load() is lazy
        // (fires on the first native call). The remote web app only ever reaches
        // native via window.__NATIVE_PRINT, so it never calls the plugin first:
        // load() would never run and the bridge would never inject (§7-5). The
        // listener list is populated before the initial onPageFinished, so
        // injection lands on the first load and every reload. The IIFE is idempotent.
        getBridge().addWebViewListener(new WebViewListener() {
            @Override
            public void onPageLoaded(WebView webView) {
                try {
                    InputStream is = getAssets().open("public/nativePrintBridge.js");
                    byte[] buf = new byte[is.available()];
                    int n = is.read(buf);
                    is.close();
                    String js = new String(buf, 0, n, StandardCharsets.UTF_8);
                    webView.post(() -> webView.evaluateJavascript(js, null));
                    Log.i("NativePrint", "bridge injected on page load");
                } catch (Exception e) {
                    Log.w("NativePrint", "bridge inject failed: " + e.getMessage());
                }
            }
        });

        // Always-on POS tablet: keep the screen awake so the print poller keeps
        // running (design §7-4).
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        // Server URL by build type (design §7-5). The config default is dev so a
        // debug build can NEVER accidentally hit production ("검증은 전부 dev").
        // A release build (deploy only) points at production.
        if (!BuildConfig.DEBUG) {
            getBridge().getWebView().post(() ->
                getBridge().getWebView().loadUrl("https://purplehere.com/pos"));
        }
    }
}
