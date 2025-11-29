import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'lifebeacon_user_id';

export const getUserId = async (): Promise<string> => {
  try {
    const existingId = await AsyncStorage.getItem(USER_ID_KEY);
    if (existingId) {
      return existingId;
    }

    const newId = uuidv4();
    await AsyncStorage.setItem(USER_ID_KEY, newId);
    return newId;
  } catch (error) {
    console.error('Error managing user ID:', error);
    // Fallback to a random string if storage fails
    return Math.random().toString(36).substring(7);
  }
};
