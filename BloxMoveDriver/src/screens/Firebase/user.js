// import { firebase } from './config'
import firestore from '@react-native-firebase/firestore';

export const usersRef = firestore().collection('users');
export const trackingRef = firestore().collection('tracking');

export const addUser = async (accountNumber, data) => {
  try {
    const user = await usersRef.doc(accountNumber).set(data);

    return {success: true};
  } catch (error) {
    console.log(error);
    return {
      error: 'Oops! an error occurred. Please try again',
      success: false,
    };
  }
};

export const getUserData = async userId => {
  try {
    const user = await usersRef.doc(userId).get();

    return {data: {...user.data(), id: user.id}, success: true};
  } catch (error) {
    console.log(error);
    return {
      error: 'Oops! an error occurred. Please try again',
      success: false,
    };
  }
};

export const updateUserData = async (userId, userData) => {
  try {
    const userRef = usersRef.doc(userId);

    await userRef.update({
      ...userData,
    });

    return {success: true};
  } catch (error) {
    return {error, success: false};
  }
};

export const updateToken = async (userId, token) => {
  try {
    await usersRef.doc(userId).update({
      token: token,
    });
    return {success: true};
  } catch (error) {
    return {error, success: false};
  }
};

export const addTracking = async (userId, data) => {
  try {
    await trackingRef.doc(userId).collection('locations').add(data);
    return {success: true};
  } catch (error) {
    return {error, success: false};
  }
};
