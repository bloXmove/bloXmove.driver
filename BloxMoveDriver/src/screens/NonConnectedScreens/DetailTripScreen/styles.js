import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
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
    depText: {
      fontSize: 16,
      fontWeight: '400',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingVertical: 5,
      lineHeight: 20,
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
    topBox: {
      marginHorizontal: 10,
      marginVertical: 20,
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
      // paddingVertical : 10,
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
      fontSize: 16,
      fontWeight: '500',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },

    profileImage: {
      width: 100,
      height: 100,
    },
    inputContainer: {
      paddinnTop: 10,
      paddingBottom: 5,
    },
    inputBox: {
      width: '100%',
      height: 45,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      paddingHorizontal: 10,
      color: appStyles.colorSet[colorScheme].blackColor,
      borderRadius: 8,
    },
    dateContainer: {
      width: '50%',
      height: 45,
      paddingHorizontal: 10,
      color: appStyles.colorSet[colorScheme].blackColor,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
    },
    datePicker: {
      width: '100%',
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
      width: '90%',
      justifyContent: 'space-between',
    },
    inputIconContainer: {
      position: 'absolute',
      right: 25,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
    },

    btnLarge: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      paddingHorizontal: 10,
      paddingVertical: 13,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '100%',
      marginTop: 50,
    },
    typeCon: {
      padding: 20,
    },
    typeContainer: {
      width: '45%',
      marginHorizontal: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey0,
      alignItems: 'center',
      borderRadius: 20,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 0.5,
      elevation: 5,
    },
    selectedContainer: {
      width: '45%',
      marginHorizontal: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].mainColor,
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      alignItems: 'center',
      borderRadius: 20,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 0.5,
      elevation: 5,
    },
    taxiImage: {
      width: 100,
      height: 60,
      resizeMode: 'contain',
    },
    connectedContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].grey6,
      width: '80%',
      alignSelf: 'center',
      justifyContent: 'space-around',
      borderRadius: 12,
      paddingVertical: 15,
    },
    disconnectContainer: {
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'flex-start',
      borderRadius: 12,
      paddingVertical: 30,
    },
    valoraImage: {
      width: 40,
      height: 40,
    },
    addressTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: appStyles.colorSet[colorScheme].blackColor,
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
      borderRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingBottom: 30,
    },
    image: {
      width: 50,
      height: 50,
      marginBottom: 20,
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
    ph10: {
      paddingHorizontal: 10,
    },
    mt10: {
      marginTop: 10,
    },
  });
};

export default dynamicStyles;
