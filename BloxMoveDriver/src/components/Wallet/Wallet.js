import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wallet = () => {
  const connector = useWalletConnect();

  return (
    <TouchableOpacity
      onPress={async () => {
        try {
          connector.connect({chainId: 56});
        } catch (err) {
          console.error('Error adding a Wallet with WalletConnect', err);
        }
      }}>
      <Text>Connect</Text>
    </TouchableOpacity>
  );
};

export default withWalletConnect(Wallet, {
  redirectUrl: 'https://bridge.walletconnect.org',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
