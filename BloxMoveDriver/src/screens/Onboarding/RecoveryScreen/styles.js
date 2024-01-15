import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '@components';

const dynamicStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
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
      marginBottom: 25,
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
    title: {
      textAlign: 'center',
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
    existContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: -20,
    },
    messageBox: {
      height: Platform.OS === 'ios' ? 150 : 130,
    },
    labelStyle: {
      textAlignVertical: 'top',
      topBlurred: Platform.OS === 'ios' ? -50 : -40,
      topFocused: Platform.OS === 'ios' ? -50 : -40,
    },
    inputStyle: {
      textAlignVertical: 'top',
      height: 100,
      fontSize: 16,
    },
    btnToggle: {
      marginRight: 15,
    },
    headerContainer: {
      marginTop: 80,
      marginBottom: 24,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};

export default dynamicStyles;
