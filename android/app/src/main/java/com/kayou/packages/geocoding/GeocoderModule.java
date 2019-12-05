package com.kayou.packages.geocoding;

import android.location.Address;
import android.location.Geocoder;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;

import java.util.List;

public class GeocoderModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static Geocoder geocoder;

    GeocoderModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        geocoder = new Geocoder(reactContext);
    }

    @Override
    public String getName() {
        return "Geocoder";
    }

    @ReactMethod
    public void geocodeFromLocation(double latitude, double longitude, Promise promise) {
        Log.d("Geocoder Module", String.format("Latitude: %s", Double.toString(latitude)));
        Log.d("Geocoder Module", String.format("Longitude: %s", Double.toString(longitude)));

        try {
            List<Address> results = geocoder.getFromLocation(latitude, longitude, 1);

            WritableMap result = Arguments.createMap();
            WritableArray addresses = new WritableNativeArray();

            Address firstAddress = results.get(0);

            Log.d("Geocoder Module: ", firstAddress.getAddressLine(0));
            result.putString("addressLine", firstAddress.getAddressLine(0));
            promise.resolve(result);
        } catch(Exception e) {
            Log.e("Geocoder ", e.getMessage());
        }
    }
}
