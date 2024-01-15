import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    scrollContainer: {
      flex: 1,
      width: '100%',
    },
    divider: {
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
    },
    flexContainer: {
      flexDirection: 'row',
    },
    btnBoxContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '500',
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
      paddingVertical: 30,
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    title: {
      fontSize: 17,
      fontWeight: '700',
      fontFamily: 'Poppins-Regular',
      paddingBottom: 5,
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    priceText: {
      fontSize: 17,
      fontWeight: '700',
      fontFamily: 'Poppins-Regular',
      paddingBottom: 5,
      marginTop: 10,
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    text: {
      fontSize: 16,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingVertical: 5,
    },
    depText: {
      fontSize: 14,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingVertical: 5,
      lineHeight: 20,
    },
    subText: {
      fontSize: 16,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingVertical: 5,
    },
    headerBox: {
      borderRadius: 10,
      paddingBottom: 20,
      padding: 15,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      marginHorizontal: 10,
      marginVertical: 20,
      shadowColor: '#006',
      borderColor: '#ddd',
      borderWidth: 0.5,
      shadowOffset: {
        width: 0,
        height: 5
      },
      shadowOpacity: 0.05,
      shadowRadius: 0.5,
      elevation: 5,
    },
    bodyBoxContainer: {
      paddingHorizontal: 10,
      marginBottom: 10,
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
        height: 5
      },
      shadowOpacity: 0.05,
      shadowRadius: 0.5,
      elevation: 5
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
      resizeMode: 'contain'
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
        height: 0
      },
      shadowOpacity: 0.25,
      shadowRadius: 0.5,
      elevation: 5
    },
    btnContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '50%',
    },
    btnCancelContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].blackColor,
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '50%',
    },
    btnText: {
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
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
      width: '85%',
      justifyContent: 'space-between',
    },
    inputIconContainer: {
      position: 'absolute',
      right: 25,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
    },

    taxiImg: {
      width: 60,
      height: 60,
      position: 'absolute',
      right: 10,
    },
    headerImg: {
      width: '100%',
      height: 180,
      position: 'absolute',
      left: 0,
    },
    btnBack: {
      marginLeft: 20,
    },
  });
};

export default dynamicStyles;
