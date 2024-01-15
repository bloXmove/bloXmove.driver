import {COLORS} from '../theme';
import {TextStyle, ViewStyle} from 'react-native';
import {btnSize, BtnType} from './types';

type ContainerStyle = {
  [Property in btnSize]: ViewStyle;
};

export const CONTAINER_STYLE: ContainerStyle = {
  large: {
    height: 64,
    paddingHorizontal: 26,
    borderRadius: 24,
  },
  medium: {
    height: 64,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
};

const ROUND: ViewStyle = {
  paddingHorizontal: 0,
  borderRadius: 24,
};

export const ROUND_CONTAINER_STYLE: ContainerStyle = {
  large: {
    width: 52,
    ...ROUND,
  },
  medium: {
    width: 41,
    ...ROUND,
  },
};

type BG = {
  [key in keyof typeof BtnType]?: ViewStyle;
};

export const CONTAINER: BG = {
  primary: {backgroundColor: COLORS.primary},
  primaryWarning: {backgroundColor: COLORS.error},
  grey: {backgroundColor: COLORS.form},
  outlined: {},
  outlinedWarning: {},
  link: {height: undefined, paddingHorizontal: 0},
};

export const DISABLED_CONTAINER: BG = {
  primary: {backgroundColor: COLORS.disabled},
  primaryWarning: {backgroundColor: COLORS.disabled},
  outlined: {},
  outlinedWarning: {},
  link: {height: undefined, paddingHorizontal: 0},
};

export const PRESSED_CONTAINER: BG = {
  primary: {
    backgroundColor: COLORS.pressed,
  },
  primaryWarning: {
    backgroundColor: COLORS.pressed,
  },
  outlined: {
    ...DISABLED_CONTAINER.outlined,
    backgroundColor: COLORS.form,
    borderColor: 'transparent',
  },
  outlinedWarning: {
    ...DISABLED_CONTAINER.outlinedWarning,
    backgroundColor: COLORS.form,
    borderColor: 'transparent',
  },
  link: {height: undefined, paddingHorizontal: 0, opacity: 0.5},
};

type Color = {
  [key in keyof typeof BtnType]?: TextStyle;
};

export const COLOR: Color = {
  primary: {color: COLORS.white},
  primaryWarning: {color: COLORS.white},
  outlined: {color: COLORS.primary},
  outlinedWarning: {color: COLORS.primary},
  link: {color: COLORS.primary},
};

export const DISABLED_COLOR: Color = {
  primary: {color: COLORS.white},
  primaryWarning: {color: COLORS.white},
  outlined: {color: COLORS.disabled},
  outlinedWarning: {color: COLORS.disabled},
  link: {color: COLORS.disabled},
};
