package com.iquarkt.css3.animation;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class JQMPong1Activity extends Activity 
{
   WebView mWebView;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        
        mWebView = (WebView) findViewById(R.id.webview);
        mWebView.setWebViewClient(new TravelClient());
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.getSettings().setDomStorageEnabled(true);
        mWebView.loadUrl("file:///android_asset/www/JQMPong1.html");
    }

    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && mWebView.canGoBack()) {
            mWebView.goBack();            
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
   
    private class TravelClient extends WebViewClient {
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
           System.out.println("URL: " + url);
           view.loadUrl("javascript:changeLocation('" + url + "')");
           return true;
        }
    }
}
