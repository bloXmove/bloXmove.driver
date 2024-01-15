import React, {useLayoutEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Platform,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';

import Icon from 'react-native-vector-icons/Ionicons';
import WalletConnect from '@walletconnect/client';

const GetStartScreen = props => {
  const {navigation, route} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const userType = route.params.userType;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.btnToggle}
          onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back-outline'} size={30} color={'black'} />
        </TouchableOpacity>
      ),
      headerShown: true,
    });
  }, []);

  // Valora
  let connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
    clientMeta: {
      description: 'WalletConnect Developer App',
      url: 'https://walletconnect.org',
      icons: [
        'https://bloxmove.ng/wp-content/uploads/2022/01/cropped-siteicon-192x192.png',
      ],
      name: 'bloxmove driver',
    },
  });
  connector.on('session_update', (error, payload) => {
    if (error) {
      throw error;
    }
    // Get updated accounts and chainId
    const {accounts} = payload.params[0];
    grantAccess(accounts[0]);
  });
  connector.on('disconnect', (error, payload) => {
    if (error) {
      throw error;
    }
    // Refresh Connection When User Cancel Connect On Valora App
    // toggleModal();
  });
  const grantAccess = async accountId => {
    navigation.navigate('LoginStack', {
      screen: 'Grant',
      params: {
        accountId: accountId,
        appStyles,
        appConfig,
        userType,
      },
    });
  };
  const clickConnect = async () => {
    if (connector.connected) {
      grantAccess(connector.accounts[0]);
      return;
    }
    connector.createSession().then(async () => {
      var uri = connector.uri;
      try {
        await Linking.openURL(
          // Platform.OS === 'ios' ? 'https://valoraapp.com/wc?uri=' + uri : uri,
          Platform.OS === 'ios' ? 'celo://wallet/wc?uri=' + uri : uri,
        );
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image
          style={styles.bgImage}
          source={appStyles.iconSet.city}
          size={200}
          color="white"
        />
        <View style={styles.topContainer}>
          <Text style={styles.centerTitle}>HOW TO GET STARTED</Text>
          <Text style={styles.title}>Step 1</Text>
          <Text style={styles.smText}>
            Download Valora app from Play store/ apple store and set up you
            wallet with your phone number.
          </Text>
          <Text style={styles.title}>Step 2</Text>
          <Text style={styles.smText}>
            Click connect wallet on bloXmove app. This will take you to Valora.
            Allow connection in Valora. Blue notication on top screen in Valora
            app indicates successful connection.
          </Text>
          <Text style={styles.title}>Step 3</Text>
          <Text style={styles.smText}>
            Then open bloXmove app and click “Grant access”. Set username and
            email.
          </Text>
          <Text style={styles.moreText}>More to onboarding</Text>
          <TouchableOpacity
            onPress={async () =>
              await Linking.openURL('https://www.bloxmove.ng')
            }>
            <Text style={styles.linkText}>www.bloxmove.ng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.valoraButton} onPress={clickConnect}>
            <Image
              style={styles.valoraSmImage}
              source={appStyles.iconSet.cello}
            />
            <Text style={styles.btnText}>Connect Wallet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
GetStartScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default GetStartScreen;
