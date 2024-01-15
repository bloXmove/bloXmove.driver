import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import dynamicStyles from './styles';
import deviceStorage from '../../utils/AuthDeviceStorage';
import {
  getManufacture,
  getToken,
  getVerificationStatus,
  getVersions,
  loginActions,
} from '../../utils/api/actions';
import {useDispatch} from 'react-redux';
import {Button, Text} from '@components';
import svgs from '../../../../assets/svg/svgs';
import {getSignatureLogin} from '@app/src/screens/HomeScreens/utils/api/nft';
import {displayLoginErrors} from '@app/src/helpers';
import DeviceInfo from 'react-native-device-info';
import {SERVER_URL} from '@app/src/lib/config';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {setProvider} from '@app/src/lib/WalletFacade';
import {clearLocalWallet} from '@app/src/lib/LocalWallet';

const GrantScreen = props => {
  const {navigation, route} = props;
  const userType = route.params.userType;
  const exist = route.params.exist;
  const styles = dynamicStyles();
  const dispatch = useDispatch();

  const {isConnected, provider} = useWalletConnectModal();

  const [accountId, setAccountId] = useState(route.params.accountId);
  const [loading, setLoading] = useState(false);

  const confirmAccess = async () => {
    setLoading(true);
    const checkUpgrade = await forceUpgrade();
    if (checkUpgrade.success !== true) {
      setLoading(false);
      return;
    }
    getVerificationStatus(accountId)
      .then(response => {
        const result = response.data.data;
        if (result.status === true) {
          loginAction();
        } else {
          navigation.navigate('ProcessingScreen');
          setLoading(false);
        }
      })
      .catch(async error => {
        const hanldeError = displayLoginErrors(error);
        if (hanldeError === 'loginAction') {
          if (exist) {
            Alert.alert(
              'Driver not found',
              'Please register as a new driver to proceed.',
            );
            setProvider(null);
            await clearLocalWallet();
            setLoading(false);
            return;
          }
          signUp();
          setLoading(false);
        }
        if (hanldeError === 'noInternet') {
          navigation.navigate('ErrorScreen', {
            title: 'You’re offline',
            subTitle: 'No internet. Connect to wi-fi or cellular network. ',
            buttonTitle: 'Try again',
          });
        }
        setLoading(false);
      });
  };

  const signUp = () => {
    setLoading(false);
    dispatch(getManufacture());
    navigation.navigate(userType === '0' ? 'OTP' : 'Personal', {
      accountId: accountId,
      userType: userType,
    });
  };

  const loginAction = async () => {
    const signatureResult = await getSignatureLogin(accountId, '');
    if (signatureResult.success !== true) {
      setLoading(false);
      Alert.alert('Please grant access');
      return;
    }
    const result = await getToken(
      accountId,
      userType === '0' ? 'COMPANY' : 'INDIVIDUAL',
    );
    if (result.success === true) {
      if (!isConnected) {
        await deviceStorage.setShouldShowOnboardingFlow('true');
      }
      await deviceStorage.setAccountNumber(accountId);
      const token = result.data.token;
      await deviceStorage.setUserType(
        userType === '0' ? 'COMPANY' : 'INDIVIDUAL',
      );
      await dispatch(loginActions(token));
      await deviceStorage.setVerificationShowFlow('false');
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
          },
        ],
      });
    } else {
      // signUp();
      displayLoginErrors(result.error);
      setLoading(false);
    }
  };

  const forceUpgrade = async () => {
    // Check App version only if it's a prod version
    if (SERVER_URL !== 'https://ngraprod.bloxmove.ng/nigeria-backend/v1/') {
      return {
        success: true,
      };
    }
    let buildNumber = DeviceInfo.getBuildNumber();
    let version = DeviceInfo.getVersion();
    const currentVersion = version + '(' + buildNumber + ')';
    const versionNumbers = await getVersions();
    if (!versionNumbers.success) {
      const hanldeError = displayLoginErrors(versionNumbers.error);
      if (hanldeError === 'noInternet') {
        navigation.navigate('ErrorScreen', {
          title: 'You’re offline',
          subTitle: 'No internet. Connect to wi-fi or cellular network. ',
          buttonTitle: 'Try again',
        });
      }
      return {
        success: false,
      };
    }
    let serverVersion = '';
    let forceFlag = '';
    versionNumbers.data.map(item => {
      if (item.key === 'DRIVER_APP_FORCE_UP') {
        forceFlag = item.value;
      }
    });
    if (forceFlag === 'OFF') {
      return {
        success: true,
      };
    }
    if (Platform.OS === 'android') {
      versionNumbers.data.map(item => {
        if (item.key === 'DRIVER_APP_VER_ANDROID') {
          serverVersion = item.value;
        }
      });
    }
    if (Platform.OS === 'ios') {
      versionNumbers.data.map(item => {
        if (item.key === 'DRIVER_APP_VER_IOS') {
          serverVersion = item.value;
        }
      });
    }
    if (serverVersion !== currentVersion) {
      navigation.navigate('ErrorScreen', {
        title: 'New update',
        subTitle:
          'You are using the old app version. Update your app to continue.',
        buttonTitle: 'Update',
      });
      return {
        success: false,
      };
    } else {
      return {
        success: true,
      };
    }
  };

  const goBack = async () => {
    setLoading(true);
    try {
      await provider?.disconnect();
    } catch (e) {}
    navigation.goBack();
    setLoading(false);
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <TouchableOpacity
            style={styles.btnToggle}
            disabled={loading}
            onPress={() => goBack()}>
            <svgs.Back />
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={require('@app/assets/image/icons/logo_small.png')}
            resizeMode="contain"
          />
          {!exist && (
            <>
              <Text textStyle="body14SemiBold">New wallet created</Text>
              <Text style={styles.text}>
                A new and secure wallet will be created for your transactions.
                You can Access the wallet recovery phrase in the profile section
                for future access.
              </Text>
            </>
          )}
          {exist && (
            <>
              <Text style={styles.text}>
                bloXmove wants to secure connection with your Wallet.
              </Text>
              <Text textStyle="body14SemiBold">Wallet address</Text>
              <Text style={styles.text}>{accountId}</Text>
            </>
          )}
        </View>
        <Button
          onPress={confirmAccess}
          disabled={loading}
          containerStyle={styles.button}
          title="Proceed"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GrantScreen;
