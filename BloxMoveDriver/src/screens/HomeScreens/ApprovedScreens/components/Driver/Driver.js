import {Text} from '@components';
import React from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Profile from '@app/assets/image/icons/profile.svg';
import Svgs from '@app/assets/svg/svgs';
import FastImage from 'react-native-fast-image';

export const Driver = ({item, containerStyles}) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.flexContainer}>
        <View style={styles.driverImage}>
          {item?.passenger?.avatar && item?.passenger?.avatar !== '' ? (
            <FastImage
              style={styles.profileImg}
              source={{
                uri: item?.passenger?.avatar,
                cache: FastImage.cacheControl.web,
                priority: FastImage.priority.normal,
              }}
              collapsable={false}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <Profile style={styles.profileImg} />
          )}
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
