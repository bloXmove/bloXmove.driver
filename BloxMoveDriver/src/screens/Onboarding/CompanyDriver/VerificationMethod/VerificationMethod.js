import React, {useState} from 'react';
import {View, Image, ScrollView, SafeAreaView} from 'react-native';
import dynamicStyles from './styles';
import {Button, Text} from '@components';

const VerificationMethod = props => {
  const {navigation, route} = props;
  const styles = dynamicStyles();

  const [accountId, setAccountId] = useState(route.params.accountId);

  const gotoQR = () => {
    navigation.navigate('QRScreen', {accountId: accountId});
  };

  const gotoCode = () => {
    navigation.navigate('OTP', {accountId: accountId});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <Image
            style={styles.image}
            source={require('@app/assets/image/icons/logo_small.png')}
            resizeMode="contain"
          />
          <Text textStyle="header24">Choose verification method</Text>
          <Text style={styles.text}>
            As a company driver, you are required to provide a means of
            verification. Please choose with one you can provide now
          </Text>

          <Button
            onPress={gotoQR}
            containerStyle={styles.button}
            title="Scan QR code"
          />
          <Button
            onPress={gotoCode}
            containerStyle={styles.button}
            title="Provide company code"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerificationMethod;
