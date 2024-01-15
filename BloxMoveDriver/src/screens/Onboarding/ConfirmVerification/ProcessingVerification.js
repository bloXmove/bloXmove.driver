import React, {useState} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Button, Text} from '@components';
import dynamicStyles from './styles';
import * as Progress from 'react-native-progress';
import {useDispatch} from 'react-redux';
import {getToken, loginActions} from '../../utils/api/actions';
import deviceStorage from '../../utils/AuthDeviceStorage';
import {getSignatureLogin} from '@app/src/screens/HomeScreens/utils/api/nft';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '@components';
import svgs from '../../../../assets/svg/svgs';
import {displayErrors} from '@app/src/helpers';
import {setProvider} from '@app/src/lib/WalletFacade';
import {clearLocalWallet} from '@app/src/lib/LocalWallet';

const ProcessingVerification = props => {
  const {navigation, route} = props;
  const userData = route.params.data;
  const accountId = userData.walletAddress;
  // const verified = route.params.verified;
  const {provider} = useWalletConnectModal();
  const styles = dynamicStyles();
  const [loading, setLoading] = useState(false);
  const [verified, setVerification] = useState(route.params.verified);
  const dispatch = useDispatch();

  const signInAction = () => {
    navigation.navigate('LoginStack', {
      screen: 'Grant',
      params: {
        accountId: accountId,
        userType: 'INDIVIDUAL',
        exist: true,
      },
    });
  };
  const confirmAction = async () => {
    setLoading(true);
    const signatureResult = await getSignatureLogin(accountId, provider);
    if (signatureResult.success !== true) {
      setLoading(false);
      Alert.alert('Please grant the access');
      return;
    }
    await deviceStorage.setShouldShowOnboardingFlow('true');
    // await deviceStorage.setAccount(userData);
    await deviceStorage.setUserType('INDIVIDUAL');
    await deviceStorage.setAccountNumber(userData.walletAddress);
    const result = await getToken(accountId, 'INDIVIDUAL');
    if (result.success === true) {
      const token = result.data.token;
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
      displayErrors(result.error);
      setLoading(false);
    }
  };

  const closeAction = async () => {
    await deviceStorage.setVerificationShowFlow('false');
    await deviceStorage.setAccessToken('');
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <View>
          {/* Used to update non verified account */}
          {!verified && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backIcon}>
              <svgs.Back />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => closeAction()}
            style={styles.closeIcon}>
            <Icon name="close" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <View style={styles.topContainer}>
            {verified && (
              <Progress.Circle
                size={200}
                thickness={3}
                showsText={verified}
                progress={1}
                animated={verified}
                indeterminate={!verified}
                style={styles.progress}
                formatText={() => {
                  return verified ? '100%' : '0%';
                }}
              />
            )}
            {/* Verified */}
            {verified && (
              <Text textStyle="body18Medium">Verification Successful</Text>
            )}
            {!verified && (
              <View style={styles.iconContainer}>
                <Icon name={'close'} size={40} color={COLORS.white} />
              </View>
            )}
            {!verified && (
              <Text textStyle="body18Medium">Verification not complete</Text>
            )}
          </View>
          {/* Verified */}
          {verified && (
            <Text style={styles.description} textStyle="body14Regular">
              Congratulations, your information has been verified. Please watch
              the intro video below.
            </Text>
          )}
        </View>
        <View>
          {verified && (
            <Button
              containerStyle={styles.buttonTop}
              type="primary"
              onPress={signInAction}
              title="Sign in"
              disabled={!verified || loading}
            />
          )}
          <Button
            containerStyle={styles.button}
            type="primary"
            onPress={confirmAction}
            title="Continue"
            disabled={!verified || loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProcessingVerification;
