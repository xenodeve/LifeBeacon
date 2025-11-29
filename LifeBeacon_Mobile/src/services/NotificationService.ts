import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
    
    await Notifications.setNotificationChannelAsync('live-updates', {
        name: 'Live Updates',
        importance: Notifications.AndroidImportance.LOW, // Low importance for ongoing updates to avoid sound
        vibrationPattern: [0],
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  return finalStatus === 'granted';
}

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

export async function updateLiveStatus(status: string) {
    // In Android, we can update an existing notification by ID to create a "Live" effect
    await Notifications.scheduleNotificationAsync({
        identifier: 'live-status',
        content: {
            title: 'LifeBeacon Status',
            body: status,
            sticky: true,
            autoDismiss: false,
            color: '#FF0000',
            priority: Notifications.AndroidNotificationPriority.LOW,
        },
        trigger: null,
    });
}
