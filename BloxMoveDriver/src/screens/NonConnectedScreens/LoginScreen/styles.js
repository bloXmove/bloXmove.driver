import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '@components';

const dynamicStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    scrollView: {
      marginHorizontal: 32,
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      marginBottom: 32,
    },

    phoneInput: {
      height: 64,
      backgroundColor: COLORS.white,

      paddingHorizontal: 16,
      paddingTop: 8,

      borderRadius: 8,
      borderWidth: 2,
      borderColor: COLORS.disabled,
    },
    phoneInputText: {
      marginTop: 6,
      color: COLORS.black,
      fontFamily: FONTS.medium,
      fontSize: 18,
      lineHeight: 18 * 1.35,
    },
    phoneNumberLabel: {
      position: 'absolute',
      zIndex: 2,

      left: 16,
      top: 10,

      fontFamily: FONTS.regular,
      fontSize: 10,
    },
    header: {
      marginTop: 80,
      flexDirection: 'row',
    },
    title: {
      marginBottom: 24,
    },
    description: {
      color: COLORS.body,
      marginBottom: 24,
    },
    terms: {
      color: COLORS.body,
      marginVertical: 16,
    },
    link: {
      color: COLORS.primary,
      textDecorationLine: 'underline',
    },
    resendCodeText: {
      color: COLORS.body,
      textAlign: 'center',
    },
    resendContainer: {
      marginTop: 20,
    },
    timer: {
      textDecorationLine: 'underline',
      color: COLORS.primary,
    },
    error: {
      color: COLORS.error,
    },
    passwordContainer: {
      maxWidth: '95%',
    },
    passwordVisible: {
      position: 'absolute',
      right: 10,
      top: 20,
    },
    flexContainer: {
      flexDirection: 'row',
    },
    backIcon: {
      marginRight: 32,
    },
  });
};

export default dynamicStyles;
