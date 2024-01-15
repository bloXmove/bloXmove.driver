import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import dynamicStyles from './styles';
import {useDispatch} from 'react-redux';
import '@walletconnect/react-native-compat';
import {
  getNFTABI,
  getNFTDataAddress,
  getUserInfo,
  loginActions,
} from '../../utils/api/actions';
import deviceStorage from '../../utils/AuthDeviceStorage';
import {LoginActivityIndicator} from '../../../components';
import messaging from '@react-native-firebase/messaging';
import {
  setCurrent,
  setListJourney,
} from '@app/src/screens/HomeScreens/redux/actions';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {getLocalSigner} from '@app/src/lib/WalletFacade';

const WelcomeScreen = props => {
  const {route, navigation} = props;
  const appStyles = route.params.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const {isConnected, address, provider} = useWalletConnectModal();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // Manage Notification When the application is opened from a quit state
  const handleInitialNotification = async () => {
    const notification = await messaging().getInitialNotification();
    if (notification) {
      const notiType = notification.data.type;
      const data = JSON.parse(notification.data.data);
      if (notiType === 'NEW_JOURNEY_REQUEST') {
        const newData = [...[], data];
        dispatch(setListJourney({data: newData}));
        // dispatch(setCurrent({data: data}));
      }
    }
  };
  useEffect(() => {
    if (provider) {
      tryLoginFirst();
    }
  }, [isConnected, provider]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, [isConnected]);

  const tryLoginFirst = async () => {
    await getNFTDataAddress();
    await getNFTABI();
    // await getLocalSigner();
    const localWallet = await deviceStorage.getAccountNumber();
    const accessToken = await deviceStorage.getAccessToken();
    const expiredAt = await deviceStorage.getExpired();
    console.log(isConnected, 'isConnected');
    // Show Verification Flow
    const shouldShowVerificationFlow =
      await deviceStorage.getVerificationShowFlow();
    if (shouldShowVerificationFlow) {
      const accountData = await deviceStorage.getAccount();
      navigation.navigate('Confirm', {
        accountId: localWallet,
        data: accountData,
      });
      setLoading(false);
      return;
    }
    const shouldShowOnboardingFlow =
      await deviceStorage.getShouldShowOnboardingFlow();
    if (shouldShowOnboardingFlow && localWallet !== '') {
      const userInfo = await getUserInfo(accessToken);
      if (userInfo.success === true) {
        loginAction(localWallet, accessToken);
      } else {
        setLoading(false);
      }
      return;
    }
    if (isConnected && typeof localWallet === 'string' && accessToken !== '') {
      const accountId = address;
      if (localWallet.toUpperCase() !== accountId.toUpperCase()) {
        setLoading(false);
        return;
      }
      if (accessToken !== '' && expiredAt > Math.round(Date.now() / 1000)) {
        const userInfo = await getUserInfo(accessToken);
        if (userInfo.success === true) {
          loginAction(accountId, accessToken);
        } else {
          setLoading(false);
        }
        return;
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const loginAction = async (accountId, token) => {
    try {
      await dispatch(loginActions(token, accountId));
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
          },
        ],
      });
      handleInitialNotification();
    } catch (e) {
      setLoading(false);
    }
  };
  const getStart = type => {
    navigation.navigate('GetStart', {
      userType: type,
    });
  };
  if (loading) {
    return <LoginActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please select an option below</Text>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => getStart('0')}>
        <Text style={styles.btnText}>Company's driver</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => getStart('1')}
        style={styles.btnContainer}>
        <Text style={styles.btnText}>Independent driver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
