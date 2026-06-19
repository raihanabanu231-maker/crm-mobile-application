import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Set up the notification handler so it shows the notification when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Requests permission for notifications and returns true if granted.
 */
export async function setupNotifications(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#E85874',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.log('Failed to get notification permissions!');
    return false;
  }

  // Set up interactive notification categories (Action Buttons)
  await Notifications.setNotificationCategoryAsync('CHECK_IN_CATEGORY', [
    {
      identifier: 'CHECK_IN_ACTION',
      buttonTitle: 'Check-In Now ✅',
      options: {
        opensAppToForeground: true,
      },
    },
  ]);

  await Notifications.setNotificationCategoryAsync('CHECK_OUT_CATEGORY', [
    {
      identifier: 'CHECK_OUT_ACTION',
      buttonTitle: 'Check-Out Now 🚪',
      options: {
        opensAppToForeground: true,
      },
    },
  ]);

  return true;
}

/**
 * Cancels all previous notifications and schedules the daily Check-in (9:25 AM) and Check-out (6:30 PM) alarms.
 */
export async function scheduleDailyAlarms() {
  // First, clear all previously scheduled notifications to avoid duplicates
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule Check-in Alarm at 9:25 AM
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Check-in Reminder ⏰",
      body: "Don't forget to check in for the day!",
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
      categoryIdentifier: 'CHECK_IN_CATEGORY',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 9,
      minute: 25,
    },
  });

  // Schedule Check-out Alarm at 6:30 PM (18:30)
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Check-out Reminder 🌙",
      body: "Remember to check out before you leave!",
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
      categoryIdentifier: 'CHECK_OUT_CATEGORY',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 18,
      minute: 25,
    },
  });

  console.log("Scheduled daily check-in (9:25 AM) and check-out (6:30 PM) alarms.");
}

/**
 * Triggers an immediate local push notification (useful for in-app alerts).
 */
export async function sendLocalNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: null,
  });
}
