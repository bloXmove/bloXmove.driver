import React from 'react';
import {View, Modal} from 'react-native';
import dynamicStyles from './styles';
import FastImage from 'react-native-fast-image';

const LoginActivityIndicator = props => {
  const styles = dynamicStyles();
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <View style={styles.indicatorContainer}>
          <FastImage
            style={styles.logoImg}
            source={require('@app/assets/image/icons/logo_lg.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
    </Modal>
  );
};

LoginActivityIndicator.defaultProps = {
  text: '',
};

export default LoginActivityIndicator;
