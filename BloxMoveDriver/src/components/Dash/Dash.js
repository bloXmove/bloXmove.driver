import React from 'react';
import {View, useColorScheme} from 'react-native';
import dynamicStyles from './styles';

const Dash = props => {
  const {appStyles} = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  return (
    <View style={styles.container}>
      <View style={styles.dotIcon} />
      <View style={styles.dotIcon} />
      <View style={styles.dotIcon} />
    </View>
  );
};

export default Dash;
