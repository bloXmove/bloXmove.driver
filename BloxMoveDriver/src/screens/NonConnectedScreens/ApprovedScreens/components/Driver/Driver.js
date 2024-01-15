import {COLORS, Text} from '@components';
import React from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';
import Profile from '@app/assets/image/icons/profile.svg';
import Svgs from '@app/assets/svg/svgs';

export const Driver = ({item, containerStyles}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.flexContainer}>
        <View style={styles.driverImage}>
          <Profile style={styles.profileImg} />
        </View>
        <View style={styles.textContainer}>
          <Text textStyle="body18Regular">{item?.passengerName}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.phone}
        onPress={() => Linking.openURL(`tel:${item?.passengerPhoneNumber}`)}>
          <Svgs.Phone />
      </TouchableOpacity>
    </View>
  );
};
