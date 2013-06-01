package com.iquarkt.css3.animation;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Window;
import android.view.WindowManager;
import android.view.WindowManager.LayoutParams;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class JQMPong1Activity extends Activity 
{
   WebView mWebView;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
		getWindow().addFlags(LayoutParams.FLAG_KEEP_SCREEN_ON);
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		getWindow().addFlags(
				WindowManager.LayoutParams.FLAG_FULLSCREEN);
		
        setContentView(R.layout.main);
        
        mWebView = (WebView) findViewById(R.id.webview);
        mWebView.setWebChromeClient(new WebChromeClient() {
        	  public boolean onConsoleMessage(ConsoleMessage cm) {
        	    Log.d("JQMPong1Activity", cm.message() + " -- From line "
        	                         + cm.lineNumber() + " of "
        	                         + cm.sourceId() );
        	    return true;
        	  }
        	});
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
