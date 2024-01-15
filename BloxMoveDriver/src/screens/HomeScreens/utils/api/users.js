import api from './axios';
import {getUserFail, setToken} from '../../../Onboarding/redux/index';
import deviceStorage from './../../../utils/AuthDeviceStorage';
import messaging from '@react-native-firebase/messaging';
import {displayErrors} from '../../../../helpers';

export function getUser(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.get('driver', {
    headers: headers,
  });
}

export function getAvailable(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.get('driver/status', {
    headers: headers,
  });
}

export function updateStatus(data, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.put('driver/status', data, {
    headers: headers,
  });
}

export function saveLocations(token, data) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.put('driver/location', data, {
    headers: headers,
  });
}

export function updateUserData(data, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.put('driver', data, {
    headers: headers,
  });
}
// Delete Account
export async function deleteAccount(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.delete('driver', {
    headers: headers,
  });
}
// Change Email
export async function changeEmail(data, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.put('passenger/email', data, {headers: headers});
}
// Delete Avatar
export async function deleteAvatar(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.delete('passenger/avatar', {
    headers: headers,
  });
}
// File Upload
export async function uploadFile(data, token) {
  const headers = {
    'Content-Type': 'multipart/form-data',
    accept: 'application/json',
  };
  const formData = new FormData();
  formData.append('type', data.type);
  formData.append('file', data.file);
  return api
    .post('utility/file-upload/' + data.walletAddress, formData, {
      headers: headers,
    })
    .then(response => {
      return {
        success: true,
        data: response.data.data.fileUrl,
      };
    })
    .catch(error => {
      // displayErrors(error);
      return {
        success: false,
      };
    });
}

export async function updateDevceId(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const deviceId = await messaging().getToken();
    const data = {
      deviceId: deviceId,
    };
    return api.put('driver/device-id', data, {
      headers: headers,
    });
  }
}

export function updateUserToken() {
  return async function (dispatch) {
    const accountId = await deviceStorage.getAccountNumber();
    const data = {
      walletAddress: accountId,
      timeStamp: new Date().getTime(),
      signature: '123',
    };
    return api
      .post('passenger/login', data)
      .then(response => {
        dispatch(
          setToken({
            token: response.data.data.token,
          }),
        );
      })
      .catch(error => {
        dispatch(getUserFail({error: true}));
      });
  };
}
