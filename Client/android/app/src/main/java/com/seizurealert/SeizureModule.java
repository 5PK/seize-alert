package com.seizurealert;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

/**
 * Seizure module extends react context base java module
 */
public class SeizureModule extends ReactContextBaseJavaModule {

    /**
     * Stores React class name.
     */
    public static final String REACT_CLASS = "SeizureAlert";

    /**
     * Stores the react context of an react application context.
     */
    private static ReactApplicationContext reactContext;

    /**
     * Constructor that initializes a non null react application context.
     */
    public SeizureModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    /**
     * Get the name of the seizure module for the react context.
     * @return a react class of the application.
     */
    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    /**
     * Start the service of seizure module for a react method.
     */
    @ReactMethod
    public void startService() {
        this.reactContext.startService(new Intent(this.reactContext, SeizureService.class));
    }

    /**
     * Stop service of a seizure module for a react method.
     */
    @ReactMethod
    public void stopService() {
        this.reactContext.stopService(new Intent(this.reactContext, SeizureService.class));
    }
}
