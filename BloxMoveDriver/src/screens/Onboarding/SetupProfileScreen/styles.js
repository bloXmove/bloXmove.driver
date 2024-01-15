import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '@components';

const dynamicStyles = () => {
  return StyleSheet.create({
    safeview: {
      flexGrow: 1,
      backgroundColor: COLORS.white,
    },
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: COLORS.white,
    },
    container: {
      paddingHorizontal: 32,

      justifyContent: 'space-between',
      flexGrow: 1,
      paddingBottom: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    phoneInputContainer: {
      marginBottom: 24,
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
      fontFamily: FONTS.regular,
      fontSize: 18,
      lineHeight: Platform.OS === 'android' ? 18 * 1.1 : 18 * 1.35,
      flex: 1,
    },
    phoneNumberLabel: {
      position: 'absolute',
      zIndex: 2,
      left: 16,
      top: 10,
      fontFamily: FONTS.regular,
      fontSize: 10,
      color: COLORS.body,
    },
    headerContainer: {
      flexDirection: 'row',
      marginTop: 80,
      marginBottom: 24,
      alignItems: 'center',
    },
    title: {
      marginLeft: 33,
    },
    description: {
      color: COLORS.body,
      marginBottom: 24,
    },
    terms: {
      color: COLORS.body,
      marginBottom: 16,
    },
    link: {
      color: COLORS.primary,
      textDecorationLine: 'underline',
    },
    resendCodeText: {
      color: COLORS.body,
      textAlign: 'center',

      marginBottom: 16,
    },
    timer: {
      textDecorationLine: 'underline',
      color: COLORS.primary,
    },
    error: {
      color: COLORS.error,
    },
    step: {
      color: COLORS.body,
      marginBottom: 16,
      textAlign: 'right',
    },
  });
};

export default dynamicStyles;
