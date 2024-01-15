import {COLORS} from '@components';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 32,
    flexGrow: 1,
    backgroundColor: COLORS.white,

    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
  },
  description: {
    marginTop: 24,
    marginBottom: 32,
    textAlign: 'center',

    color: COLORS.body,
  },
  iconContainer: {
    width: 92,
    height: 92,
    borderRadius: 100,

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50%',
  },
});
