import {COLORS} from '@components';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  iconContainer: {
    height: 18,
    width: 18,

    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 14,
    width: 14,

    borderRadius: 10,
    borderColor: COLORS.white,
    borderWidth: 2,
  },
});
