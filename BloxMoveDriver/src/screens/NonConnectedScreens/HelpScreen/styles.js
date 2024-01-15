import {COLORS} from '@components';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  content: {
    padding: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 16,
  },
  backButton: {
    marginRight: 32,
  },
  messageBox: {
    height: 300,
  },
  labelStyle: {
    textAlignVertical: 'top',
    topBlurred: -120,
    topFocused: -130,
  },
  inputStyle: {
    textAlignVertical: 'top',
    height: 280,
  },
});
