import {Text} from '@components';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {Pin} from '../Pin/Pin';

export const AddressRequest = ({from, to, numberOfLines}) => {
  return (
    <View style={styles.requsetcontainer}>
      <View style={styles.icons}>
        <Pin color="blue" />
        <View style={styles.verticalDividerRequest} />
        <Pin color="green" />
      </View>
      <View style={styles.textContainer}>
        <Text textStyle="body10Regular" style={styles.label}>
          Pickup Location
        </Text>
        <Text textStyle="body18Regular">{from}</Text>
        <View style={styles.horizontalDivider} />
        <Text textStyle="body10Regular" style={styles.label}>
          Destination
        </Text>
        <Text textStyle="body18Regular">{to}</Text>
      </View>
    </View>
  );
};
