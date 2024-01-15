import React from 'react';
import {
  View,
  useColorScheme,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Platform,
} from 'react-native';
import dynamicStyles from './styles';
import {Button, COLORS, Text} from '@components';
import Icon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ErrorScreen = props => {
  const {route, navigation} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(props.appStyles, colorScheme);
  const {title, subTitle, buttonTitle} = route.params;
  const downloadValora = async () => {
    await Linking.openURL(
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/us/app/valora-crypto-wallet/id1520414263'
        : 'https://play.google.com/store/apps/details?id=co.clabs.valora&hl=en_US&gl=US',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <Text textStyle="body18Semibold" style={styles.title}>
          {title}
        </Text>
        <Text textStyle="body14Regular" style={styles.subTitle}>
          {subTitle}
        </Text>
        <Button
          title={buttonTitle}
          containerStyle={styles.btnContainer}
          onPress={downloadValora}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

ErrorScreen.defaultProps = {
  text: '',
};

export default ErrorScreen;
