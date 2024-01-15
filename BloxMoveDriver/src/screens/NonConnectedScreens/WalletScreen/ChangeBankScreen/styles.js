import {COLORS} from '@components';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 32,
    backgroundColor: COLORS.white,

    flexGrow: 1,
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 16,
    marginBottom: 40,
  },
  backButton: {
    marginRight: 32,
  },
});
