import {Platform, Linking, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS} from 'react-native-permissions';
import {getAddressFromCoordinates} from './getAddressName';
import DeviceInfo from 'react-native-device-info';

export const checkPermission = async () => {
  var permissionStatus = '';
  if (Platform.OS === 'android') {
    // Change location permission about Android 9
    let systemVersion = parseFloat(DeviceInfo.getSystemVersion());
    permissionStatus = await request(
      systemVersion < 10
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    )
      .then(async result => {
        return result;
      })
      .catch(error => {
        return 'fail';
      });
  } else {
    permissionStatus = await Geolocation.requestAuthorization('always');
  }
  return permissionStatus;
};
export const checkFinePermission = async () => {
  var permissionStatus = '';
  if (Platform.OS === 'android') {
    permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(async result => {
        return result;
      })
      .catch(error => {
        return 'fail';
      });
  } else {
    permissionStatus = await Geolocation.requestAuthorization('always');
  }
  return permissionStatus;
};

export const checkCameraPermission = async () => {
  var permissionStatus = '';
  if (Platform.OS === 'android') {
    permissionStatus = await request(PERMISSIONS.ANDROID.CAMERA)
      .then(async result => {
        return result;
      })
      .catch(error => {
        return false;
      });
  } else {
    permissionStatus = await request(PERMISSIONS.IOS.CAMERA)
      .then(async result => {
        return result;
      })
      .catch(error => {
        return false;
      });
  }
  return permissionStatus;
};

export const openSetting = (text, title) => {
  Alert.alert(title && title !== '' ? title : '', text, [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => Linking.openSettings(),
    },
  ]);
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => {
        resolve(pos);
      },
      error => {
        // Alert.alert('', "Sorry, we can't get your location");
        resolve('fail');
      },
    );
  });
};

export const getCurrentData = async () => {
  const permissionStatus = await checkPermission();
  if (permissionStatus !== 'granted') {
    openSetting(
      'bloXmove Driver collects location data to enable recording your trips to work and calculate distance-travelled, even when the app is closed or not in use.',
    );
    return 'fail';
  }
  const location = await getCurrentLocation();
  const locations = await getAddressFromCoordinates(
    location.coords.latitude,
    location.coords.longitude,
  );
  const data = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    locationName: locations.long_name ? locations.long_name : 'Lagos',
    timestamp: Math.round(Date.now() / 1000),
  };
  return data;
};
