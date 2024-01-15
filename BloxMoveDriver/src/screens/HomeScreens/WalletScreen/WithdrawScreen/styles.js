import {COLORS} from '@components';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  safeView: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    padding: 32,
    flexGrow: 1,
    backgroundColor: COLORS.white,

    justifyContent: 'space-between',
  },
  bankButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  info: {
    marginHorizontal: 16,
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
  center: {
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
  divider: {
    height: 2,
    width: '100%',

    backgroundColor: COLORS.form,
    marginVertical: 16,
  },
  description: {
    color: COLORS.body,
    marginTop: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 16,
    marginBottom: 40,
  },
  backButton: {
    marginRight: 32,
  },
  content: {
    marginBottom: 40,
  },
});
