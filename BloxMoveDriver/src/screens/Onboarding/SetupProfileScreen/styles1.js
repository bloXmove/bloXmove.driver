import {Platform, StyleSheet} from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    avoidContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      paddingBottom: 20,
    },
    title: {
      fontSize: 17,
      fontFamily: 'Poppins-Regular',
      fontWeight: '700',
      textAlign: 'left',
      paddingBottom: 5,
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    text: {
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      lineHeight: 25,
      fontWeight: '500',
      textAlign: 'left',
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    lightText: {
      fontWeight: '400',
    },
    image: {
      width: '100%',
      position: 'absolute',
    },
    flexContainer: {
      flexDirection: 'row',
    },
    boxContainer: {
      width: '90%',
      padding: 30,
      marginTop: 30,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    btnContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 40,
      color: '#0A1F44',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      paddingHorizontal: 50,
      paddingVertical: 13,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '100%',
    },
    btnText: {
      fontSize: 15,
      fontWeight: '500',
      lineHeight: 20,
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    inputBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: appStyles.colorSet[colorScheme].grey0,
      borderBottomWidth: 1,
      height: 50,
      lineHeight: 40,
    },
    InputContainer: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'Poppins-Regular',
      paddingLeft: 10,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '50%',
      alignSelf: 'center',
      textAlign: 'right',
      borderRadius: 10,
    },
    birthContainer: {
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      paddingLeft: 10,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      width: '50%',
      alignSelf: 'center',
      textAlign: 'right',
      borderRadius: 10,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    inputSelect: {
      paddingTop: 5,
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      fontWeight: '400',
      color: 'black',
      textAlign: 'right',
      width: Platform.OS === 'ios' ? 130 : 150,
      height: 40,
    },

    flagStyle: {
      width: 35,
      height: 25,
      borderColor: appStyles.colorSet[colorScheme].mainTextColor,
    },
    phoneInputTextStyle: {
      borderRightWidth: 0,
      borderLeftWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      height: 42,
      fontSize: 15,
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].mainTextColor,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      paddingLeft: 10,
    },
    input: {
      flex: 1,
      borderLeftWidth: 1,
      borderRadius: 3,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      color: appStyles.colorSet[colorScheme].mainTextColor,
      fontSize: 17,
      fontFamily: 'Poppins-Regular',
      fontWeight: '700',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    // Modal
    modalView: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalHeader: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingBottom: 23,
    },

    Modalcontent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopStartRadius: 20,
      borderTopEndRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingBottom: 30,
    },
    datePicker: {
      marginTop: 20,
      width: '100%',
    },
    closeIcon: {
      alignSelf: 'flex-end',
      position: 'absolute',
      right: 10,
      top: 10,
    },
    btnLeft: {
      marginLeft: 20,
    },
    mt10: {
      marginTop: 10,
    },
    mt20: {
      marginTop: 20,
    },
  });
};

export default dynamicStyles;
