import {Alert} from 'react-native';

export const displayErrors = error => {
  if (error.response) {
    console.log('Error Response: ', error.response.data.message);
    if (!error.response.data.message) {
      switch (error.response.status) {
        case 400:
          Alert.alert('Bad Request', error.message);
          break;
        case 401:
          Alert.alert('Unauthorized', error.message);
          break;
        case 403:
          Alert.alert('Forbidden', error.message);
          break;
        case 404:
          Alert.alert('Not Found', error.message);
          break;
        case 409:
          Alert.alert('Conflict', error.message);
          break;
        case 500:
          Alert.alert('Internal Server Error', error.message);
          break;
        case 502:
          Alert.alert('Bad Gateway', error.message);
          break;
        default:
          Alert.alert(
            'Service Unavailable',
            'The server is currently unable to handle the request due to maintenance or overloading.',
          );
          break;
      }
      return;
    }
    Alert.alert(
      '',
      Array.isArray(error.response.data.message)
        ? error.response.data.message[0]
        : error.response.data.message,
    );
  } else if (error.request) {
    Alert.alert(
      'Network Error',
      'The server might be unreachable or not responding. Please check your internet connection and try again later.',
    );
    console.log('Error Request :', error.request);
    return 'noInternet';
  } else {
    Alert.alert('An error occurred', error.message);
    console.log('Error', error.message);
  }
};
export const displayLoginErrors = error => {
  if (error.response) {
    const errorMsg = error.response.data.message;
    console.log(errorMsg);
    if (!error.response.data.message) {
      switch (error.response.status) {
        case 400:
          Alert.alert('Bad Request', error.message);
          break;
        case 401:
          Alert.alert('Unauthorized', error.message);
          break;
        case 403:
          Alert.alert('Forbidden', error.message);
          break;
        case 404:
          Alert.alert('Not Found', error.message);
          break;
        case 409:
          Alert.alert('Conflict', error.message);
          break;
        case 500:
          Alert.alert('Internal Server Error', error.message);
          break;
        case 502:
          Alert.alert('Bad Gateway', error.message);
          break;
        default:
          Alert.alert(
            'Service Unavailable',
            'The server is currently unable to handle the request due to maintenance or overloading.',
          );
          break;
      }
      return;
    }
    if (errorMsg === 'Driver not found.') {
      return 'loginAction';
    }
    Alert.alert('', Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    return false;
  } else if (error.request) {
    return 'noInternet';
  } else {
    console.log('Error', error.message);
    return false;
  }
};

export const displayEtherErrors = error => {
  if (error.code) {
    if (error.code === 'INSUFFICIENT_FUNDS') {
      Alert.alert(
        'Insufficient Celo',
        'Celo is needed for gas fee on the blockchain. Kindly contact support and report the problem.',
      );
    } else {
      Alert.alert(error.code);
    }
    return;
  } else if (error.message) {
    Alert.alert('', error.message);
  }
};
