import Sound from 'react-native-sound';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

var whoosh = new Sound('requestLong.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

export function playSound() {
  whoosh.play(success => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
}

export async function stopSound() {
  if (Platform.OS === 'android') {
    PushNotification.cancelAllLocalNotifications();
  } else {
    whoosh.stop();
  }
}
