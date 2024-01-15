import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  useColorScheme,
  Platform,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import deviceStorage from '../../utils/AuthDeviceStorage';
import {request, PERMISSIONS} from 'react-native-permissions';
import {useDispatch} from 'react-redux';
import {
  getToken,
  createCompanyAccount,
  loginActions,
} from '../../utils/api/actions';
import {Text} from '@components';
import svgs from '../../../../assets/svg/svgs';
import {displayErrors} from '@app/src/helpers';
import {getDeviceId, openSetting} from '@app/src/helpers';
import {getSignatureLogin} from '@app/src/screens/HomeScreens/utils/api/nft';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';

const QRScreen = props => {
  const {navigation, route} = props;
  const appStyles = route.params.appStyles;
  const accountId = route.params.accountId;
  const userType = route.params.userType;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const [loading, setLoading] = useState(false);
  const {provider} = useWalletConnectModal();

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = () => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.CAMERA)
        .then(result => console.log(result))
        .catch(error => console.log(error));
    }
  };

  const dispatch = useDispatch();

  const onSuccess = async e => {
    const tokenPermission = await getDeviceId();
    setLoading(true);
    if (tokenPermission === 'fail') {
      setLoading(false);
      openSetting(
        'Please allow notification permission to get the push notification',
      );
      return;
    }
    const data = {
      walletAddress: accountId,
      companyCode: e.data,
      deviceId: tokenPermission,
    };
    createCompanyAccount(data)
      .then(response => {
        loginAction();
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };
  const loginAction = async () => {
    const signatureResult = await getSignatureLogin(accountId, provider);
    if (signatureResult.success !== true) {
      setLoading(false);
      Alert.alert('Please grant access');
      return;
    }
    const result = await getToken(accountId, 'COMPANY');
    if (result.success === true) {
      await deviceStorage.setShouldShowOnboardingFlow('true');
      await deviceStorage.setAccountNumber(accountId);
      const token = result.data.token;
      await deviceStorage.setUserType('COMPANY');
      await dispatch(loginActions(token));
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
          },
        ],
      });
    } else {
      setLoading(false);
      // signUp();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.marginHeaderContainer}>
          <TouchableOpacity
            style={styles.btnToggle}
            onPress={() => navigation.goBack()}>
            <svgs.Back />
          </TouchableOpacity>
          <Text textStyle="body18Medium" style={styles.title}>
            Scan QR code
          </Text>
        </View>
        <View style={styles.qrBox}>
          <Image
            style={styles.qrBG}
            source={require('@app/assets/image/icons/qrBg.png')}
          />
          <Text style={styles.qrText}>
            Please scan your company QR code to proceed.
          </Text>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.off}
            containerStyle={styles.qrOutContainer}
            cameraStyle={styles.qrCamera}
            cameraProps={{
              ratio: '9:9',
              notAuthorizedView: (
                <View style={styles.notAuthContainer}>
                  <Text style={styles.noPermissionText}>
                    Please Allow Camera Permission
                  </Text>
                </View>
              ),
            }}
            notAuthorizedView={
              <Text style={styles.noPermissionText}>
                Please Allow Camera Permission
              </Text>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
  // return (
  //   <SafeAreaView style={styles.container}>
  //     <KeyboardAwareScrollView
  //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  //       style={styles.scrollContainer}>
  //       <View style={styles.container}>
  //         <View style={styles.headerContainer}>
  //           <TouchableOpacity onPress={() => navigation.goBack()}>
  //             <Icon name="arrow-back-outline" size={30} color="#000" />
  //           </TouchableOpacity>
  //           <Text textStyle="body18Medium" style={styles.title}>
  //             Scan QR code
  //           </Text>
  //         </View>
  //         {/* <TouchableOpacity
  //           onPress={() => props.navigation.goBack()}
  //           style={styles.backIcon}>
  //           <Icon name="arrow-back-outline" size={30} color="#000" />
  //         </TouchableOpacity> */}
  //         <View style={[styles.boxContainer, styles.QRContainer]}>
  //           <Text style={styles.title}>Scan QR Code From Your Company</Text>
  //           <View style={styles.qrBox}>
  //             <QRCodeScanner
  //               onRead={onSuccess}
  //               flashMode={RNCamera.Constants.FlashMode.off}
  //               containerStyle={styles.qrOutContainer}
  //               cameraStyle={styles.qrCamera}
  //               cameraProps={{
  //                 ratio: '9:9',
  //                 notAuthorizedView: (
  //                   <View style={styles.notAuthContainer}>
  //                     <Text style={styles.noPermissionText}>
  //                       Please Allow Camera Permission
  //                     </Text>
  //                   </View>
  //                 ),
  //               }}
  //               notAuthorizedView={
  //                 <Text style={styles.noPermissionText}>
  //                   Please Allow Camera Permission
  //                 </Text>
  //               }
  //             />
  //           </View>
  //           <Text style={styles.orText}>Or</Text>
  //           <TouchableOpacity
  //             style={[styles.btnContainer, styles.mt0]}
  //             onPress={() =>
  //               props.navigation.navigate('LoginStack', {
  //                 screen: 'OTP',
  //                 params: {
  //                   isSigningUp: false,
  //                   appStyles,
  //                   appConfig,
  //                 },
  //               })
  //             }>
  //             <Text style={styles.btnText}>Enter 8 Digit Code Here</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </KeyboardAwareScrollView>
  //   </SafeAreaView>
  // );
};

QRScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default QRScreen;
