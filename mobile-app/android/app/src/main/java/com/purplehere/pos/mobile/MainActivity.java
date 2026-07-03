package com.purplehere.pos.mobile;

import android.os.Bundle;
import android.view.WindowManager;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Register the custom native print plugin BEFORE the bridge initializes
        // so window.Capacitor.Plugins.NativePrint is available to the remote page
        // (design §7-5). nativePrintBridge.js then maps it onto __NATIVE_PRINT.
        registerPlugin(NativePrintPlugin.class);
        super.onCreate(savedInstanceState);

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
