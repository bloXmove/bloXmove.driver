import React from 'react';
import {View, useColorScheme, Modal, Linking, Platform} from 'react-native';
import dynamicStyles from './styles';
import {Button, COLORS, Text} from '@components';
import {APPSTORE_URL, PLAYSTORE_URL} from '@app/src/lib/constants';

const ErrorScreen = props => {
  const {route, navigation} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(props.appStyles, colorScheme);
  const {title, subTitle, buttonTitle} = route.params;

  return (
    <View style={styles.container}>
      <Text textStyle="body18Semibold" style={styles.title}>
        {title}
      </Text>
      <Text textStyle="body14Regular" style={styles.subTitle}>
        {subTitle}
      </Text>
      <Button
        title={buttonTitle}
        containerStyle={styles.btnContainer}
        onPress={async () => {
          if (title === 'New update') {
            try {
              await Linking.openURL(
                Platform.OS === 'android' ? PLAYSTORE_URL : APPSTORE_URL,
              );
            } catch {}
            return;
          }
          navigation.goBack();
        }}
      />
    </View>
  );
};

ErrorScreen.defaultProps = {
  text: '',
};

export default ErrorScreen;
