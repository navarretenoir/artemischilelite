package cl.kotone.artemislite;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.OutputStream;

/** ARTEMIS Chile Lite — la interfaz (assets/ui/index.html) en un WebView, sin internet y sin permisos. Desarrollada por Javiera Navarrete. */
public class MainActivity extends Activity {
    private static final int R_GUARDAR = 21;
    private WebView web;
    private String pendiente;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);          // los datos del curso viven en localStorage, solo en este dispositivo
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setAllowFileAccessFromFileURLs(false);
        s.setAllowUniversalAccessFromFileURLs(false);
        setContentView(web);
        web.addJavascriptInterface(new Puente(), "ArtemisLiteAndroid");
        web.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView v, String url) {
                if (url.startsWith("file:///android_asset/")) return false;
                if (url.startsWith("mailto:")) { try { startActivity(new Intent(Intent.ACTION_SENDTO, Uri.parse(url))); } catch (Exception e) { /* sin app de correo */ } }
                return true;                       // nada más sale de la app
            }
        });
        web.loadUrl("file:///android_asset/ui/index.html");
    }

    /** Única función nativa que la interfaz puede llamar: guardar el respaldo en un archivo elegido por la persona. */
    private class Puente {
        @JavascriptInterface public void guardarArchivo(String nombre, String texto) {
            pendiente = texto;
            Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT); i.addCategory(Intent.CATEGORY_OPENABLE); i.setType("application/json"); i.putExtra(Intent.EXTRA_TITLE, nombre);
            startActivityForResult(i, R_GUARDAR);
        }
    }

    @Override protected void onActivityResult(int req, int res, Intent d) {
        if (req == R_GUARDAR && res == RESULT_OK && d != null && d.getData() != null && pendiente != null) {
            try (OutputStream o = getContentResolver().openOutputStream(d.getData())) { o.write(pendiente.getBytes("UTF-8")); } catch (Exception e) { /* sin acceso: no se guarda */ }
        }
        pendiente = null;
    }

    @Override public void onBackPressed() { if (web != null && web.canGoBack()) web.goBack(); else super.onBackPressed(); }
}
