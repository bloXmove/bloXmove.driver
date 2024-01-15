import {StyleSheet, Platform} from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    divider: {
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
    },
    flexContainer: {
      flexDirection: 'row',
    },
    centerContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    valorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    valorImg: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    cardStyle: {
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      textColor: appStyles.colorSet[colorScheme].blackColor,
      placeholderColor: appStyles.colorSet[colorScheme].grey9,
      borderRadius: 8,
    },
    cardInputStyle: {
      width: '100%',
      height: Platform.OS === 'ios' ? 150 : 140,
      borderColor: appStyles.colorSet[colorScheme].grey9,
      borderRadius: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '400',
      textAlign: 'center',
      paddingVertical: 10,
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    title: {
      fontSize: 20,
      fontWeight: '500',
      paddingBottom: 5,
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    text: {
      fontSize: 16,
      fontWeight: '400',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingVertical: 5,
    },
    boxContainer: {
      borderRadius: 10,
      paddingBottom: 20,
      padding: 15,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      // backgroundColor: '#ddd',
      shadowColor: '#006',
      borderColor: '#ddd',
      borderWidth: 0.5,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.05,
      shadowRadius: 0.5,
      elevation: 5,
    },
    boxHeader: {
      paddingBottom: 10,
    },
    boxBottomHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 10,
    },
    boxBody: {
      paddingTop: 10,
    },
    makerImg: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    listContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      padding: 10,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      justifyContent: 'space-between',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 0.5,
      elevation: 5,
    },
    btnPayContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '50%',
      marginHorizontal: 1,
    },
    btnNewCardContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      width: '50%',
      marginHorizontal: 1,
    },
    btnContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '30%',
    },
    btnText: {
      fontSize: 14,
      fontWeight: '500',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    btnCardText: {
      fontSize: 16,
      fontWeight: '500',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },

    // Modal
    modalView: {
      paddingHorizontal: 10,
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
      // alignItems: 'center',
      borderRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      width: '100%',
    },
    modalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
    },
    image: {
      width: 50,
      height: 50,
      marginBottom: 20,
    },
    inputContainer: {
      justifyContent: 'center',
      marginTop: 10,
    },
    inputBox: {
      width: '100%',
      paddingLeft: 50,
      height: 45,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      paddingHorizontal: 10,
      color: appStyles.colorSet[colorScheme].blackColor,
      borderRadius: 8,
    },
    leftContainer: {
      borderTopEndRadius: 0,
      borderBottomEndRadius: 0,
    },
    rightContainer: {
      borderLeftWidth: 0,
      borderTopStartRadius: 0,
      borderBottomStartRadius: 0,
    },
    codeFieldContainer: {
      marginTop: 10,
      marginBottom: 20,
      alignItems: 'center',
    },
    codeInputCell: {
      width: 50,
      height: 50,
      lineHeight: 30,
      fontSize: 26,
      fontWeight: '400',
      textAlign: 'center',
      marginLeft: 8,
      color: appStyles.colorSet[colorScheme].blackColor,
      borderBottomColor: appStyles.colorSet[colorScheme].grey3,
      backgroundColor: appStyles.colorSet[colorScheme].grey3,
      // IOS
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      //Android
      elevation: 3,
      borderRadius: 10,
      alignItems: 'center',
      textAlignVertical: 'bottom',
    },
    focusCell: {
      borderColor: '#000',
      backgroundColor: appStyles.colorSet[colorScheme].grey3,
    },
    orTextStyle: {
      marginTop: 40,
      marginBottom: 10,
      alignSelf: 'center',
      color: appStyles.colorSet[colorScheme].mainTextColor,
    },
    activeCell: {
      paddingTop: Platform.OS === 'ios' ? 10 : 0,
    },
    cardIcon: {
      position: 'absolute',
      left: 10,
    },
    closeIcon: {
      position: 'absolute',
      right: 0,
    },
    halfWidth: {
      width: '50%',
    },
    pb30: {
      paddingBottom: 30,
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
