package com.seizurealert;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.support.v4.app.NotificationCompat;
import android.app.NotificationManager;
import android.app.NotificationChannel;
import android.os.Build;

import com.facebook.react.HeadlessJsTaskService;

/**
 * Seizure service that extends to the service class.
 */
public class SeizureService extends Service {

    /**
     * Stores service notification for the app
     */
    private static final int SERVICE_NOTIFICATION_ID = 12345;

    /**
     * Stores th channel id of the app service.
     */
    private static final String CHANNEL_ID = "SEIZURE";

    /**
     * Stores handler for the seizure service.
     */
    private Handler handler = new Handler();

    /**
     * Stores the runnable code for the headless js task.
     */
    private Runnable runnableCode = new Runnable() {

        /**
         * Run the headless js task.
         */
        @Override
        public void run() {
            Context context = getApplicationContext();
            Intent myIntent = new Intent(context, SeizureEventService.class);
            context.startService(myIntent);
            HeadlessJsTaskService.acquireWakeLockNow(context);
        }
    };

    /**
     * Create a notification channel.
     */
    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "SEIZURE", importance);
            channel.setDescription("CHANEL DESCRIPTION");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    /**
     * On bind intent, return null.
     * @return null.
     */
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    /**
     * Create seizure service 
     */
    @Override
    public void onCreate() {
        super.onCreate();
    }

    /**
     * Destroy callbacks for the seizure services
     */
    @Override
    public void onDestroy() {
        super.onDestroy();
        this.handler.removeCallbacks(this.runnableCode);
    }

    /**
     * On start command, create the notificiation for the seizure service app
     * @return start seizure service for the app.
     */
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        this.handler.post(this.runnableCode);
        createNotificationChannel();
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Seizure service")
                .setContentText("Running...")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentIntent(contentIntent)
                .setOngoing(true)
                .build();
        startForeground(SERVICE_NOTIFICATION_ID, notification);
        return START_STICKY;
    }
}