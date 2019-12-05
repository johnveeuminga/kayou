package com.kayou;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.maps.android.PolyUtil;

public class PolyUtilModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static PolyUtil polyUtil;

    PolyUtilModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "PolyUtil";
    }

    @ReactMethod
    public void testMethod(
            double latitude,
            double longitude
    ) {
        Log.i("[PolyUtil] Latitude ", String.valueOf(latitude));
        Log.i("[PolyUtil] Longitude ", String.valueOf(longitude));
    }
}