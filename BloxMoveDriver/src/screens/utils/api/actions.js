import {ethers} from 'ethers';
import {getDeviceId} from '@app/src/helpers/getDeviceId';
import {getCurrentJourney} from '../../HomeScreens/utils/api/jonuney';
import {getRates} from '../../HomeScreens/utils/api/payment';
import {updateDevceId} from '../../HomeScreens/utils/api/users';
import {
  setManucatureList,
  setToken,
  setUserData,
} from '../../Onboarding/redux/actions';
import deviceStorage from '../AuthDeviceStorage';
import api from './axios';
import testApi from './testAxios';
import {openSetting} from '@app/src/helpers/getPermission';

export const getToken = async (accountId, driverType) => {
  const signature = await deviceStorage.getSigature();
  const timeStamp = await deviceStorage.getSigTime();
  const tokenPermission = await getDeviceId();
  if (tokenPermission === 'fail') {
    openSetting(
      'Please allow notification permission to get the push notification',
    );
    return;
  }
  const data = JSON.stringify({
    walletAddress: ethers.utils.getAddress(
      String(accountId).toLowerCase().trim(),
    ),
    timestamp: parseInt(timeStamp, 10),
    signature: signature,
    deviceId: tokenPermission,
    driverType: driverType,
  });
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  return api
    .post('driver/login', data, {headers: headers})
    .then(async response => {
      await deviceStorage.setAccessToken(response.data.data.token);
      await deviceStorage.setExpired(response.data.data.expiredAt.toString());
      return {
        success: true,
        data: response.data.data,
      };
    })
    .catch(error => {
      var status = '';
      if (error.response) {
        status = error.response.status;
        console.log('Token Error Response: ', error.response.data);
      } else if (error.request) {
        console.log('Token Error Request: ', error.request);
      } else {
        console.log('Token Error: ', error.message);
      }
      return {
        success: false,
        status: status,
        error: error,
        data: error.response,
      };
    });
};

export const createAccount = async data => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  return api.post('driver', data, {headers: headers});
};
// Update unverified account
export const updateUnverifiedAccount = async data => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  return api.put('driver/update-unverified', data, {headers: headers});
};
// Update Verification status
export const updateVerificationStatus = async data => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return testApi.put(
    'test-only/' + data + '/update-verification-statue-to-passed',
    {},
    {headers: headers},
  );
};

export const getVerificationStatus = async data => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return api.get(
    'driver/' + data + '/verification-status',
    {},
    {headers: headers},
  );
};
// Company
export const createCompanyAccount = async data => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  return api.post('driver/create-company-driver', data, {headers: headers});
};
export function getUserInfo(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api
    .get('driver', {
      headers: headers,
    })
    .then(response => {
      return {
        success: true,
        data: response.data.data,
      };
    })
    .catch(error => {
      return {
        success: false,
      };
    });
}
// End of company
export function getDriver(token) {
  return function async(dispatch) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return api
      .get('driver', {
        headers: headers,
      })
      .then(response => {
        dispatch(setUserData({data: response.data.data}));
      })
      .catch(error => {});
  };
}

export async function getNFTDataAddress() {
  return api
    .get('utility/address')
    .then(async response => {
      await deviceStorage.setNFTADDRESS(JSON.stringify(response.data.data));
    })
    .catch(error => {});
}
export async function getNFTABI() {
  return api
    .get('utility/abi')
    .then(async response => {
      await deviceStorage.setNFTAbi(JSON.stringify(response.data.data));
    })
    .catch(error => {});
}

export function getManufacture() {
  return function async(dispatch) {
    return api
      .get('utility/car-manufacturers?page=1&size=1000&sort=DESC')
      .then(response => {
        const data = [];
        response.data.data.map(item => {
          var temp = {};
          temp.value = item.name;
          temp.label = item.name;
          data.push(temp);
        });
        dispatch(
          setManucatureList({
            data: data,
            loading: false,
          }),
        );
      })
      .catch(error => {});
  };
}
export function getModels(data) {
  const headers = {
    'Content-Type': 'application/json',
  };
  return api.get('utility/car-models/' + data, {}, {headers: headers});
}
export function getVINList() {
  const headers = {
    'Content-Type': 'application/json',
  };
  return api.get('vin/list', {}, {headers: headers});
}

export const getVersions = async () => {
  const headers = {
    accept: 'application/json',
  };
  return api
    .get('utility/app-versions', {}, {headers: headers})
    .then(async response => {
      const data = response.data.data;
      return {
        success: true,
        data: data,
      };
    })
    .catch(error => {
      return {
        success: false,
        error: error,
      };
    });
};

export function loginActions(token) {
  return async function async(dispatch) {
    await dispatch(getDriver(token));
    dispatch(getCurrentJourney(token));
    dispatch(getRates(token));
    dispatch(getManufacture());
    dispatch(setToken({token: token}));
    // await getNFTDataAddress();
    await getNFTABI();
    // updateDevceId(token);
    return 'success';
  };
}
