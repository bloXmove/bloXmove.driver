import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '@components';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    // Box Container
    boxContainer: {
      width: '100%',
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginTop: 20,
      alignSelf: 'center',
      backgroundColor: 'white',
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    boxBottomHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 5,
      borderBottomColor: appStyles.colorSet[colorScheme].grey3,
      borderBottomWidth: 1,
    },
    boxBody: {
      paddingVertical: 5,
    },
    boxTitle: {
      fontSize: 17,
      fontWeight: '700',
      lineHeight: 20,
      color: appStyles.colorSet[colorScheme].blackColor,
      fontFamily: 'Poppins-Regular',
    },
    boxText: {
      fontSize: 17,
      lineHeight: 20,
      fontWeight: '400',
      color: appStyles.colorSet[colorScheme].blackColor,
      fontFamily: 'Poppins-Regular',
      paddingVertical: 5,
    },
    boxBottomText: {
      fontSize: 17,
      lineHeight: 20,
      fontWeight: '400',
      color: appStyles.colorSet[colorScheme].blackColor,
      fontFamily: 'Poppins-Regular',
      paddingVertical: 5,
      marginTop: Platform.OS === 'ios' ? 8 : 5,
    },
    priceContainer: {
      borderTopColor: appStyles.colorSet[colorScheme].grey3,
      borderTopWidth: 1,
      paddingVertical: 5,
      marginTop: 10,
    },
    priceText: {
      fontSize: 17,
      fontWeight: '700',
      lineHeight: 20,
      color: appStyles.colorSet[colorScheme].blackColor,
      fontFamily: 'Poppins-Regular',
      paddingTop: 5,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    btnAcceptContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      padding: 10,
      borderRadius: 8,
      marginLeft: 3,
    },
    btnMoreContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].blackColor,
      padding: 10,
      borderRadius: 8,
    },
    btnText: {
      fontSize: 15,
      fontWeight: '500',
      lineHeight: 20,
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      fontFamily: 'Poppins-Regular',
    },

    depRideText: {
      fontSize: 14,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      textAlign: 'left',
      color: appStyles.colorSet[colorScheme].blackColor,
      lineHeight: 25,
    },
    desRideText: {
      fontSize: 14,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      textAlign: 'left',
      color: appStyles.colorSet[colorScheme].blackColor,
      alignItems: 'center',
      lineHeight: 28,
      marginTop: 10,
    },
    flexContainer: {
      flexDirection: 'row',
    },
    leftContainer: {
      borderTopEndRadius: 0,
      borderBottomEndRadius: 0,
      width: '10%',
    },
    rightContainer: {
      borderLeftWidth: 0,
      borderTopStartRadius: 0,
      borderBottomStartRadius: 0,
      alignItems: 'flex-start',
      width: '90%',
    },
    inputLabel: {
      color: COLORS.body,
      textAlign: 'center',
    },
    buttonContainer: {
      alignSelf: 'center',
      marginTop: 18,
      marginBottom: 16,
    },
    balanceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.form,
      borderRadius: 16,
      padding: 24,
      marginTop: 16,
    },
    handle: {
      height: 4,
      width: 64,
      backgroundColor: COLORS.form,
      borderRadius: 4,

      alignSelf: 'center',
      marginTop: 5,
    },
  });
};

export default dynamicStyles;
