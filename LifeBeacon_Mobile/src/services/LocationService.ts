import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Battery from 'expo-battery';
import { Alert } from 'react-native';
import { getUserId } from './UserManager';

const LOCATION_TASK_NAME = 'background-location-task';

// Algorithm parameters
const HIGH_BATTERY_THRESHOLD = 0.2; // 20%
const STATIONARY_DISTANCE_FILTER = 50; // meters
const MOVING_DISTANCE_FILTER = 10; // meters
const STATIONARY_INTERVAL = 15 * 60 * 1000; // 15 mins
const MOVING_INTERVAL = 1 * 60 * 1000; // 1 min

export const startLocationTracking = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus !== 'granted') {
    Alert.alert("Permission Denied", "Allow location access to use this feature.");
    return;
  }

  const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
  if (backgroundStatus !== 'granted') {
    Alert.alert("Permission Denied", "Allow background location access for safety features.");
    return;
  }

  await configureLocationTask();
};

export const stopLocationTracking = async () => {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
    if (isRegistered) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }
};

const configureLocationTask = async () => {
  let batteryLevel = await Battery.getBatteryLevelAsync();
  let isLowPower = await Battery.isLowPowerModeEnabledAsync();

  let distanceFilter = MOVING_DISTANCE_FILTER;
  let timeInterval = MOVING_INTERVAL;

  if (batteryLevel < HIGH_BATTERY_THRESHOLD || isLowPower) {
      // Battery saving mode
      distanceFilter = STATIONARY_DISTANCE_FILTER;
      timeInterval = STATIONARY_INTERVAL;
      console.log("Switching to Battery Saving Mode");
  } else {
      console.log("Switching to High Accuracy Mode");
  }

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: timeInterval,
    distanceInterval: distanceFilter,
    foregroundService: {
      notificationTitle: "LifeBeacon Active",
      notificationBody: "Sharing your live location...",
    },
  });
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data as any;
    const userId = await getUserId();
    
    // Simulate sending to backend
    console.log(`[LifeBeacon] Sending location for user ${userId}:`, locations);
    
    // In a real implementation:
    // await fetch('https://api.lifebeacon.app/locations', {
    //   method: 'POST',
    //   body: JSON.stringify({ userId, locations }),
    // });
  }
});
