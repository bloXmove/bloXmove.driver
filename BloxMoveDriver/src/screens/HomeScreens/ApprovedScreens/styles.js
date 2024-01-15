import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '@components';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    scrollContainer: {
      flex: 1,
      width: '100%',
    },
    title: {
      fontSize: 17,
      fontWeight: '700',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    centerTitle: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '500',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    subTitle: {
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].grey9,
    },
    text: {
      fontSize: 16,
      fontWeight: '400',
      textAlign: 'left',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    depText: {
      fontSize: 14,
      lineHeight: 25,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      textAlign: 'left',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingBottom: 10,
    },
    desText: {
      fontSize: 14,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      textAlign: 'left',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingTop: 10,
    },
    taxIcon: {
      width: 50,
      height: 50,
    },
    image: {
      width: '100%',
      position: 'absolute',
      height: 200,
    },
    compContainer: {
      width: '95%',
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
    approvedSmContainer: {
      width: '100%',
      backgroundColor: 'white',
      paddingTop: 16,
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      position: 'absolute',
      bottom: 0,
      marginBottom: -150,
    },
    approvedFullContainer: {
      width: '100%',
      backgroundColor: 'white',
      paddingTop: 16,
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      position: 'absolute',
      bottom: 0,
    },
    boxContainer: {
      width: '95%',
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
    cancelBoxContainer: {
      width: '95%',
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      marginTop: 100,
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 30,
    },
    flexContainer: {
      flexDirection: 'row',
    },
    headerContainer: {
      backgroundColor: '#F7F7F7',
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    headerAppContainer: {
      backgroundColor: '#F7F7F7',
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    headerComContainer: {
      backgroundColor: '#F7F7F7',
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    approveContainer: {
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
    },
    cancelHeaderContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bodyContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    timeContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footerContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderBottomEndRadius: 8,
      borderBottomStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    cancelContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderBottomEndRadius: 8,
      borderBottomStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: 'row',
      paddingBottom: 20,
    },
    leftContainer: {
      width: '10%',
    },
    rightContainer: {
      justifyContent: 'center',
      width: '85%',
    },
    centerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    completedBoxContainer: {
      width: '95%',
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
    addressBoxContainer: {
      width: '95%',
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
      marginVertical: 20,
      overflow: 'hidden',
    },
    bodyBottomContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    endBottomContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomEndRadius: 15,
      borderBottomStartRadius: 15,
      paddingBottom: 20,
    },
    bodySmallBottomContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      padding: 15,
      borderRadius: 50,
      color: 'white',
      marginRight: 20,
    },
    divider: {
      borderBottomColor: '#eee',
      borderBottomWidth: 2,
    },
    taxiMapIcon: {
      width: 50,
      height: 50,
    },
    mapContainer: {
      width: '100%',
      height: '100%',
    },
    carImg: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      position: 'absolute',
      right: 20,
      top: 70,
      zIndex: 1,
    },
    makerImg: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      position: 'absolute',
      right: 20,
      top: 10,
    },
    imgContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      borderRadius: 50,
      width: 70,
      height: 70,
      top: -40,
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    reviewImg: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    btnSMContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '30%',
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
    btnSMText: {
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    btnText: {
      fontSize: 15,
      fontWeight: '500',
      lineHeight: 20,
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    track: {
      position: 'absolute',
      right: 0,
      top: -30,
    },
    // Modal
    modalView: {
      justifyContent: 'flex-end',
      margin: 0,
      flex: 1,
    },
    modalHeader: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingBottom: 23,
    },
    Modalcontent: {
      flex: Platform.OS === 'ios' ? 0.77 : 0.85,
      height: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingBottom: 30,
    },
    QRModalContent: {
      backgroundColor: 'white',
      borderRadius: 8,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingVertical: 24,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    qrContainer: {
      paddingTop: 10,
      paddingBottom: 20,
    },
    // Cancel
    headerImg: {
      width: '100%',
      height: 180,
      position: 'absolute',
      left: 0,
    },
    centerCarContainer: {
      width: 70,
      height: 70,
      marginTop: -40,
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputBox: {
      width: '100%',
      height: 100,
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      padding: 10,
      color: appStyles.colorSet[colorScheme].blackColor,
      borderRadius: 8,
      // marginVertical : 10
      marginTop: 5,
      marginBottom: 10,
    },
    cancelInputBox: {
      width: '100%',
      borderWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      padding: 10,
      color: appStyles.colorSet[colorScheme].blackColor,
      borderRadius: 8,
      // marginVertical : 10
      marginTop: 5,
      marginBottom: 10,
      height: 'auto',
      textAlignVertical: 'top',
    },
    bigInputBox: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    reasonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
    },
    checkBox: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    passInputBox: {
      width: '100%',
      height: 40,
      borderBottomWidth: 1,
      borderColor: appStyles.colorSet[colorScheme].grey3,
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    closeIcon: {
      alignSelf: 'flex-end',
      position: 'absolute',
      right: 10,
      top: 5,
    },
    fullWidth: {
      width: '100%',
    },
    pt5: {
      paddingTop: 5,
    },
    btnToggle: {
      marginLeft: 20,
    },
    btnBack: {
      marginLeft: 20,
    },
    topToggle: {
      position: 'absolute',
      top: 32,
      left: 32,

      backgroundColor: COLORS.white,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 21,

      zIndex: 120,
    },
    handle: {
      height: 4,
      width: 64,
      backgroundColor: COLORS.form,
      borderRadius: 4,

      alignSelf: 'center',
      marginBottom: 16,
    },
    mainColor: {
      color: COLORS.primary,
      marginBottom: 4,
    },
    secondColor: {
      color: COLORS.body,
      marginBottom: 8,
    },
    btn: {
      marginVertical: 32,
    },
    passengerBox: {
      marginTop: 16,
      marginBottom: 8,
    },
    passengerContainer: {
      paddingHorizontal: 0,
      marginVertical: 16,
    },
    desContainer: {
      flexDirection: 'row',
      marginVertical: 8,
    },
    cancelText: {
      color: COLORS.error,
      textDecorationLine: 'underline',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',

      padding: 32,
      paddingBottom: 0,
    },
    backButton: {
      marginRight: 32,
    },
    endText: {
      paddingTop: 16,
      color: COLORS.body,
      textAlign: 'center',
    },
    btnCancel: {
      marginVertical: 32,
      backgroundColor: COLORS.error,
      width: '100%',
    },
    btnCancelLoading: {
      marginVertical: 32,
      backgroundColor: COLORS.disabled,
      width: '100%',
    },
    btnEnd: {
      marginVertical: 16,
      backgroundColor: COLORS.error,
      width: '100%',
    },
    btnEndLoading: {
      marginVertical: 16,
      backgroundColor: COLORS.disabled,
      width: '100%',
    },
    btnContinue: {
      backgroundColor: COLORS.body,
      width: '100%',
    },
    blackColor: {
      color: COLORS.black,
    },
    addressBottom: {
      marginHorizontal: 10,
    },
    directionImage: {
      width: 113,
      height: 33,
    },
    startContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    openModalContent: {
      backgroundColor: 'white',
      paddingVertical: 50,
      paddingTop: 60,
      paddingHorizontal: 32,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    mapIcon: {
      width: 50,
      height: 50,
    },
    mapIconContainer: {
      alignContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      textAlign: 'center',
      marginTop: 10,
    },
    openWith: {
      position: 'absolute',
      top: 20,
      left: 25,
      zIndex: 1,
    },
  });
};

export default dynamicStyles;