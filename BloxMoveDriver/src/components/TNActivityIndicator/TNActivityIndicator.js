import React from 'react';
import {View, ActivityIndicator, Modal, Image} from 'react-native';
import dynamicStyles from './styles';

const TNActivityIndicator = props => {
  const styles = dynamicStyles();
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <View style={styles.indicatorContainer}>
          {/* <Image
            style={styles.image}
            source={require('@app/assets/image/icons/logo_small.png')}
            resizeMode="contain"
          /> */}
          {/* <ActivityIndicator style={styles.indicatorContainer} /> */}
        </View>
      </View>
    </Modal>
  );
};

TNActivityIndicator.defaultProps = {
  text: '',
};

export default TNActivityIndicator;
