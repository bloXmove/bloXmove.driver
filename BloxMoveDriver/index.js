/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification, {Importance} from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

PushNotification.configure({
  onRegister: function (token) {},
  onNotification: function (notification) {},
  senderID: '764979507476',
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});
PushNotification.createChannel(
  {
    channelId: 'bloxmove_notification_channel',
    channelName: 'New Request',
    importance: Importance.HIGH,
    playSound: true,
    vibrate: true,
  },
  created => {},
);
PushNotification.createChannel(
  {
    channelId: 'bloxmove_notification_channel_default',
    channelName: 'Default',
    importance: Importance.HIGH,
    playSound: true,
    vibrate: true,
  },
  created => {},
);
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const notiType = remoteMessage.data.type;
  if (notiType === 'NEW_JOURNEY_REQUEST') {
  }
});
AppRegistry.registerComponent(appName, () => App);
