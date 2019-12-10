package com.seizurealert;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Seizure packages extends to react packages.
 */
public class SeizurePackage implements ReactPackage {

    /**
     * Create a list of react native modules for the react application context.
     * @return An array of native modules for a seizure module.
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new SeizureModule(reactContext)
        );
    }

    /**
     * Create a view managers for a react application context which returns an empty collection.
     * @return an empty list of collection.
     */
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
