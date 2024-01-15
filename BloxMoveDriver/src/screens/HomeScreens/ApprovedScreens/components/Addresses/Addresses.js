import {Text} from '@components';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {Pin} from '../Pin/Pin';

export const Addresses = ({from, to}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <Pin color="blue" />
        <View style={styles.verticalDivider} />
        <Pin color="green" />
      </View>
      <View style={styles.textContainer}>
        <Text textStyle="body18Regular">{from}</Text>
        <View style={styles.horizontalDivider} />
        <Text textStyle="body18Regular">{to}</Text>
      </View>
    </View>
  );
};
