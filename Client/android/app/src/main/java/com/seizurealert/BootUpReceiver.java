package com.seizurealert;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/**
 * Bootup receiver of the android app that extends broadcast receiver class.
 */
public class BootUpReceiver extends BroadcastReceiver {

    /**
     * Start the android app with a new intent and seizure serivce class.
     */
    @Override
    public void onReceive(Context context, Intent intent) {
        context.startService(new Intent(context, SeizureService.class));
    }
}
