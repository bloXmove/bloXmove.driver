import {Button, COLORS, Text} from '@components';
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';
import * as Progress from 'react-native-progress';

export const OperationState = ({route}) => {
  const {title, description, onButtonPress, type} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                type === 'PROCESSING'
                  ? COLORS.white
                  : type === 'ERROR'
                  ? COLORS.error
                  : COLORS.primary,
            },
          ]}>
          {type === 'PROCESSING' && (
            <Progress.Circle
              size={200}
              thickness={3}
              showsText={true}
              progress={1}
              animated={true}
              indeterminate={true}
              style={styles.progress}
              color={COLORS.primary}
              borderWidth={3}
            />
          )}
          {type !== 'PROCESSING' && (
            <Icon
              name={type === 'ERROR' ? 'close' : 'check'}
              size={40}
              color={COLORS.white}
            />
          )}
        </View>
        <Text textStyle="body18Semibold">{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Button title="Continue" onPress={onButtonPress} />
    </View>
  );
};
