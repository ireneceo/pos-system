package com.purplehere.pos.mobile;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;

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
        // 카드단말기 ECR 운반(GHL, 2026-10-01) — nativePrintBridge.js 가 window.__NATIVE_ECR 로 노출
        registerPlugin(NativeEcrPlugin.class);
        // 앱 자가 업데이트(2026-10-04 NativeUpdatePlugin)는 2026-10-12 삭제 — Play 정책상 자가 설치 금지(Play 등록 설계 D3).
        // 업데이트는 Play(설치 출처가 Play 일 때) 또는 웹 카드의 브라우저 넘김(사이드로드본)으로만.
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

        // Android 16(targetSdk 36)은 화면을 상태바·내비바 밑까지 깐다(끌 수 없음). 원격 페이지는 그 여백을 모르므로
        // WebView 를 감싼 틀에 시스템바·키보드 높이만큼 패딩을 줘 지금(0.3.4)과 같은 모양을 유지한다 — 웹 코드 0줄
        // (Play 등록 설계 D5). capacitor.config 의 SystemBars.insetsHandling='disable' 과 한 쌍.
        // WebView 자신의 패딩은 Chromium 이 무시한다(2026-10-12 API 36 에뮬 실측: innerHeight 800 그대로) → 부모에 준다.
        WebView webView = getBridge().getWebView();
        View insetView = (View) webView.getParent();
        insetView.setBackgroundColor(0xFFFFFFFF);
        ViewCompat.setOnApplyWindowInsetsListener(insetView, (v, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.ime());
            v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return WindowInsetsCompat.CONSUMED;
        });
        WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView()).setAppearanceLightStatusBars(true);

        // Always-on POS tablet: keep the screen awake so the print poller keeps
        // running (design §7-4).
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        // NO runtime loadUrl swap for release builds (design §8-4 P0-5). Capacitor
        // injects its runtime for the ONE origin configured in capacitor.config, so
        // navigating the WebView to a different origin can drop
        // Capacitor.Plugins.NativePrint — the bridge IIFE then returns silently and
        // printing is dead in release, with no error anywhere. The URL is fixed at
        // BUILD time instead: PURPLE_APP_URL -> capacitor.config.ts -> cap sync.
        // (Default stays dev, so a debug build can never hit production.)
    }

    // App Link 로 들어온 주소로 이동 (2026-10-09). 처음 켤 때는 BridgeActivity.load() 가
    // onNewIntent(getIntent()) 를 부르고, 이미 켜져 있으면(singleTask) 안드로이드가 부른다 — 둘 다 여기로 온다.
    // 링크를 받는 intent-filter 는 개발용 앱(src/debug manifest)에만 있다. 정식 앱에선 이 길이 열리지 않는다.
    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        openAppLink(intent);
    }

    private void openAppLink(Intent intent) {
        if (intent == null || !Intent.ACTION_VIEW.equals(intent.getAction()) || getBridge() == null) return;
        Uri link = intent.getData();
        if (link == null) return;
        // 같은 출처(빌드 때 고정된 앱 주소의 scheme+host)만 — 다른 주소로 가면 네이티브 브릿지가 빠진다(§8-4 P0-5).
        Uri app = Uri.parse(getBridge().getAppUrl());
        String path = link.getPath() == null ? "" : link.getPath();
        boolean sameOrigin = "https".equals(link.getScheme())
                && app.getHost() != null && app.getHost().equalsIgnoreCase(link.getHost())
                && link.getPort() == app.getPort();
        boolean posScreen = path.equals("/pos") || path.startsWith("/pos/");
        // 한 번만 쓴다 — 화면 재생성 때 같은 링크로 다시 끌려가지 않게.
        intent.setData(null);
        if (!sameOrigin || !posScreen) {
            Log.w("AppLink", "ignored " + link);
            return;
        }
        WebView webView = getBridge().getWebView();
        webView.post(() -> webView.loadUrl(link.toString()));
        Log.i("AppLink", "open " + link);
    }
}
