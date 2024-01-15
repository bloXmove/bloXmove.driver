import React, {useState} from 'react';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Button} from '@components';
import dynamicStyles from './styles';
import '@walletconnect/react-native-compat';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {
  setProvider,
  createSinger,
  getLocalSigner,
} from '@app/src/lib/WalletFacade';
import FastImage from 'react-native-fast-image';
import svgs from '../../../../assets/svg/svgs';
import deviceStorage from '../../utils/AuthDeviceStorage';

const GetStartScreen = props => {
  const {navigation, route} = props;
  const userType = route.params.userType;
  const styles = dynamicStyles();
  const [loading, setLoading] = useState(false);

  // WC2
  const signIn = async () => {
    // gotoRecovery();
    // return;
    const local = await getLocalSigner();
    if (local.exist) {
      try {
        const signer = local.signer;
        navigation.navigate('LoginStack', {
          screen: 'Grant',
          params: {
            accountId: signer.address,
            userType: userType,
            exist: true,
          },
        });
      } catch {
        gotoRecovery();
      }
    } else {
      gotoRecovery();
    }
  };
  const gotoRecovery = () => {
    navigation.navigate('Recovery', {
      userType: userType,
    });
  };
  const signUp = async () => {
    setLoading(true);
    try {
      await deviceStorage.setVerificationShowFlow('false');
      const signer = await createSinger();
      if (signer !== false) {
        navigation.navigate('Grant', {
          userType: userType,
          accountId: signer.address,
          exist: false,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.btnToggle}
            disabled={loading}
            onPress={() => goBack()}>
            <svgs.Back />
          </TouchableOpacity>
          <FastImage
            style={styles.image}
            source={require('@app/assets/image/icons/logo_small.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.centerContainer}>
          <Button
            containerStyle={styles.button}
            type="primary"
            onPress={signIn}
            title="Sign In"
            disabled={loading}
          />
          <Button
            containerStyle={styles.button}
            type="primary"
            onPress={signUp}
            title="Sign Up"
            disabled={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStartScreen;
