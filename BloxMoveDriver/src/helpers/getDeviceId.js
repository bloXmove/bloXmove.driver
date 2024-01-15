import messaging from '@react-native-firebase/messaging';

export const getDeviceId = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    try {
      const token = await messaging().getToken();
      return token;
    } catch (e) {
      return 'fail';
    }
  }
  return 'fail';
};
