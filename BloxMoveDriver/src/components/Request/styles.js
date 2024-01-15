import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '@components';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    // Box Container
    boxContainer: {
      width: '90%',
      paddingHorizontal: 16,
      paddingVertical: 32,
      marginTop: 20,
      alignSelf: 'center',
      backgroundColor: 'white',
      borderRadius: 16,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    inputLabel: {
      color: COLORS.primary,
    },
    passengerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      alignItems: 'center',
    },
    flexContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    nameLabel: {
      marginLeft: 16,
    },
    primaryText: {
      color: COLORS.primary,
    },
    priceContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingVertical: 5,
      marginTop: 10,
    },
    centerContainer: {
      alignItems: 'center',
      flex: 1,
    },
    priceText: {
      color: COLORS.body,
      marginBottom: 4,
    },
    progress: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    timeText: {
      position: 'absolute',
    },

    boxBottomHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 5,
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
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
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
    btnAccept: {
      width: '45%',
    },
    btnDecline: {
      backgroundColor: COLORS.error,
      color: COLORS.white,
      width: '45%',
    },
    btnLoadingDecline: {
      backgroundColor: COLORS.body,
      color: COLORS.white,
      width: '45%',
    },
  });
};

export default dynamicStyles;
