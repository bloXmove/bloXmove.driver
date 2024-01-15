import {Platform, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '@components';

const {height} = Dimensions.get('window');

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    headerBar: {
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      width: '100%',
      height: 60,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 10,
    },
    headerTitle: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      fontSize: 17,
      fontWeight: '500',
      fontFamily: 'Poppins-Regular',
      lineHeight: 20,
    },
    headerText: {
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      fontSize: 15,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      lineHeight: 20,
    },
    nameBar: {
      marginTop: 20,
    },
    title: {
      color: appStyles.colorSet[colorScheme].blackColor,
      fontSize: 27,
      fontWeight: '700',
      fontFamily: 'Poppins-Regular',
    },
    statusContainer: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      justifyContent: 'flex-end',
    },
    requestContainer: {
      width: '100%',
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? 40 : 20,
      justifyContent: 'flex-end',
    },
    blankContainer: {
      width: '90%',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      paddingVertical: 20,
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? 40 : 20,
      alignItems: 'center',
      justifyContent: 'center',
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
    blankTitle: {
      fontSize: 17,
      fontWeight: '700',
      fontFamily: 'Poppins-Regular',
      lineHeight: 20,
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    durationContainer: {
      backgroundColor: '#2998FF',
      padding: 10,
      borderRadius: 10,
      marginLeft: 120,
    },
    durationText: {
      fontSize: 15,
      fontWeight: '700',
      fontFamily: 'Poppins-Regular',
      lineHeight: 20,
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },

    activeContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    },
    addressContainer: {
      alignContent: 'flex-start',
    },
    vehicleImage: {
      width: '60%',
      height: 200,
    },
    flexContainer: {
      flexDirection: 'row',
    },
    connectedContainer: {
      position: 'absolute',
      bottom: 60,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      width: '80%',
      alignSelf: 'center',
      justifyContent: 'space-around',
      borderRadius: 12,
      paddingVertical: 15,
      flexDirection: 'row',
    },
    disconnectContainer: {
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'flex-start',
      borderRadius: 12,
      paddingVertical: 30,
      alignItems: 'center',
    },
    innerAddress: {
      alignContent: 'flex-start',
      marginLeft: 30,
      justifyContent: 'center',
    },
    valoraImage: {
      width: 40,
      height: 40,
    },
    addressTitle: {
      fontSize: 18,
      fontWeight: '500',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    addressText: {
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Poppins-Regular',
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
    closeIcon: {
      alignSelf: 'flex-end',
      position: 'absolute',
      right: 10,
      top: 22,
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
    image: {
      width: 50,
      height: 50,
      marginBottom: 20,
    },
    btnText: {
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    connectButton: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      paddingHorizontal: 10,
      paddingVertical: 13,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '100%',
    },
    // Box Container
    boxContainer: {
      width: '90%',
      paddingHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingVertical: 70,
      marginTop: 20,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
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
    leftContainer: {
      width: '15%',
    },
    rightContainer: {
      justifyContent: 'center',
      width: '90%',
    },
    boxHeader: {
      paddingBottom: 10,
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
      paddingTop: 10,
    },
    makerImg: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    boxTitle: {
      fontSize: 17,
      fontWeight: '700',
      fontFamily: 'Poppins-Regular',
      lineHeight: 20,
      backgroundColor: 'red',
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    boxText: {
      fontSize: 16,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingVertical: 5,
    },
    priceText: {
      fontSize: 20,
      fontWeight: '400',
      fontFamily: 'Poppins-Regular',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingVertical: 5,
    },
    btnContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '30%',
    },
    btnToggle: {
      marginLeft: 20,
    },
    loadingBar: {
      marginRight: 20,
    },
    btnSwitch: {
      marginRight: 10,
      borderWidth: 1,
    },
    ml10: {
      marginLeft: 10,
    },
    mapView: {
      width: '100%',
      height: '100%',
      opacity: 1,
    },
    activeMapView: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: -10,
    },
    fullWidth: {
      width: '100%',
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
    noRequest: {
      // backgroundColor: COLORS.white,
      // width: '90%',
      // justifyContent: 'flex-end',
      // flex: 1,
      // alignItems: 'center',
      // alignSelf: 'center',
      // borderRadius: 20,
      // height: height / 3,
    },
  });
};

export default dynamicStyles;
