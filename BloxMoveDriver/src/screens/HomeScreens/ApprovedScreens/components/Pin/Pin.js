import {COLORS} from '@components';
import {View} from 'react-native';
import {styles} from './styles';
import React from 'react';

const ICONS_COLORS = {
  blue: ['#E4ECFF', '#5278DB'],
  green: ['#E7FFF1', COLORS.primary],
};

export const Pin = ({color}) => {
  return (
    <View
      style={[styles.iconContainer, {backgroundColor: ICONS_COLORS[color][0]}]}>
      <View style={[styles.icon, {backgroundColor: ICONS_COLORS[color][1]}]} />
    </View>
  );
};
