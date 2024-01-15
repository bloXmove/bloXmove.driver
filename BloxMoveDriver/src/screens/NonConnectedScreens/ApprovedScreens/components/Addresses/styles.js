import {StyleSheet} from 'react-native';
import {COLORS} from '@components';

export const styles = StyleSheet.create({
  requsetcontainer: {
    flexDirection: 'row',
  },
  label: {
    color: COLORS.body,
  },
  verticalDividerRequest: {
    flex: 0.8,
    width: 1.5,
    marginVertical: 16,

    backgroundColor: COLORS.primary,
    opacity: 0.4,
  },
  container: {
    flexDirection: 'row',

    padding: 32,
  },
  icons: {
    justifyContent: 'space-around',
    alignItems: 'center',

    paddingRight: 16,
  },

  verticalDivider: {
    flex: 1,
    width: 1.5,
    marginVertical: 16,

    backgroundColor: COLORS.primary,
    opacity: 0.4,
  },
  textContainer: {
    flexShrink: 1,
    width: '100%',
  },
  horizontalDivider: {
    height: 1.5,
    backgroundColor: COLORS.form,

    marginVertical: 16,
  },
});
