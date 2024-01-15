import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {ButtonProps} from './types';
import {
  CONTAINER,
  COLOR,
  DISABLED_COLOR,
  CONTAINER_STYLE,
  DISABLED_CONTAINER,
  PRESSED_CONTAINER,
  ROUND_CONTAINER_STYLE,
} from './styles';
import {Text} from '../Text';

export const Button: React.FC<ButtonProps> = ({
  automationId = null,
  type = 'primary',
  title,
  size = 'large',
  containerStyle,
  textStyle,
  iconNameLeft,
  iconNameRight,
  disabled,
  numberOfTextLines = 1,
  round = false,
  ...props
}) => {
  return (
    <Pressable
      disabled={disabled}
      {...props}
      style={({pressed}) =>
        StyleSheet.flatten([
          styles.container,
          CONTAINER_STYLE[size],
          disabled
            ? DISABLED_CONTAINER[type]
            : pressed
            ? PRESSED_CONTAINER[type]
            : CONTAINER[type],
          round && ROUND_CONTAINER_STYLE[size],
          typeof containerStyle === 'function'
            ? containerStyle({pressed})
            : containerStyle,
          type === 'link' && {justifyContent: 'flex-start'},
        ])
      }>
      {!round && (
        <Text
          textStyle="body18Medium"
          numberOfLines={numberOfTextLines}
          style={StyleSheet.flatten([
            disabled ? DISABLED_COLOR[type] : COLOR[type],
            type === 'link' && {
              fontSize: 14,
              textDecorationLine: 'underline',
              fontFamily: 'Poppins-SemiBold',
            },
            textStyle,
          ])}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
