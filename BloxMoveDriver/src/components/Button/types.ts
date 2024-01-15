import {PressableProps, StyleProp, TextStyle, TextProps} from 'react-native';

export enum BtnType {
  primary = 'primary',
  outlined = 'outlined',
  link = 'text',
  primaryWarning = 'primary-warning',
  outlinedWarning = 'outlined-warning',
  grey = 'grey',
}

export type btnSize = 'large' | 'medium';

export interface ButtonProps extends PressableProps {
  automationId?: string | null;
  title?: string;
  type?: keyof typeof BtnType;
  size?: btnSize;
  containerStyle?: PressableProps['style'];
  iconRightMargin?: number;
  textStyle?: StyleProp<TextStyle>;
  iconNameLeft?: string;
  iconNameRight?: string;
  disabled?: boolean;
  numberOfTextLines?: TextProps['numberOfLines'];
  round?: boolean;
}
