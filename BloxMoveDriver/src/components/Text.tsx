import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from './theme';

export type Fonts =
  | 'body18Medium'
  | 'body18Regular'
  | 'body18Semibold'
  | 'body14Regular'
  | 'body14SemiBold'
  | 'body10SemiBold'
  | 'body10Regular'
  | 'header24';

type FontStyles = {
  [T in Fonts]: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
};

const FONT_STYLES: FontStyles = {
  body18Medium: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 18 * 1.35,
  },
  body18Regular: {
    fontFamily: FONTS.regular,
    fontSize: 18,
    lineHeight: 18 * 1.35,
  },
  body18Semibold: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    lineHeight: 18 * 1.35,
  },
  body14Regular: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 14 * 1.35,
  },
  body14SemiBold: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    lineHeight: 14 * 1.35,
  },
  body10SemiBold: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    lineHeight: 10 * 1.35,
  },
  body10Regular: {
    fontFamily: FONTS.regular,
    fontSize: 10,
    lineHeight: 10 * 1.35,
  },
  header24: {fontFamily: FONTS.semiBold, fontSize: 24, lineHeight: 24 * 1.2},
};

export interface TextProps extends RNTextProps {
  automationId?: string;
  textStyle?: Fonts;
}

export const Text: React.FC<TextProps> = ({
  automationId,
  children,
  style,
  textStyle = 'body14Regular',
  ...props
}) => {
  const fontStyle = FONT_STYLES[textStyle];

  return (
    <RNText
      style={StyleSheet.flatten([styles.color, fontStyle, style])}
      {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  color: {color: COLORS.black},
});
