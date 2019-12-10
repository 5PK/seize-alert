package com.seizurealert;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.polidea.reactnativeble.BlePackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  /**
   * Initializes a react native host.
   */
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    
    /**
     * Get the current state of debug mode for the build.
     * @return state of the build config in debug mode.
     */
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    /**
     * Get the list of react packages.
     * @return an array of all react packages by the application.
     */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNFSPackage(),
          new BlePackage(),
          new SeizurePackage()
      );
    }

    /**
     * Get Js main module name.
     * @return index.
     */
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  /**
   * Get React Native host.
   * @return main react native host.
   */
  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  /**
   * Creates the main application.
   */
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
