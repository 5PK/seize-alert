package com.seizurealert;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

/**
 * Seizure event service that extends to the headless js task service,
 * handles seizure events.
 */
public class SeizureEventService extends HeadlessJsTaskService {
    /**
     * Configuration of the headless javascript task that returns a new headless
     * js task or a null.
     * @param Intent intent intent of the headless task
     * @returns a headless javascript task configuration.
     */
    @Nullable
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        return new HeadlessJsTaskConfig(
                "SeizureAlert",
                extras != null ? Arguments.fromBundle(extras) : null,
                5000,
                true);
    }
}