import {StyleSheet} from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    title: {
      fontSize: 24,
      lineHeight: 36,
      fontFamily: 'Poppins-SemiBold',
      fontWeight: '600',
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].blackColor,
      marginTop: 50,
      marginBottom: 100,
      width: '80%',
      alignSelf: 'center',
    },
    text: {
      fontSize: 18,
      fontFamily: 'Poppins-Regular',
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingTop: 10,
    },
    btnContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      paddingHorizontal: 10,
      paddingVertical: 18,
      marginBottom: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'white',
      width: '80%',
    },
    openButton: {
      marginTop: 10,
      width: '75%',
    },
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
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
    image: {
      width: 50,
      height: 50,
      marginBottom: 20,
    },
    closeIcon: {
      alignSelf: 'flex-end',
      position: 'absolute',
      right: 10,
      top: 22,
    },
    closeQRIcon: {
      position: 'absolute',
      top: 50,
      right: 20,
      alignSelf: 'flex-start',
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 27,
      fontFamily: 'Poppins-SemiBold',
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
    disconnectContainer: {
      flexDirection: 'row',
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      paddingVertical: 20,
      alignItems: 'center',
    },
    valoraImage: {
      width: 60,
      height: 60,
    },
    // QR Modal
    qrDescription: {
      width: 250,
      marginBottom: 20,
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    walletLogoContainer: {
      flexDirection: 'row',
      position: 'absolute',
      top: -25,
      left: 20,
      alignItems: 'center',
    },

    QRModalContent: {
      flex: 1,
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingBottom: 30,
    },
    mr10: {
      marginRight: 10,
    },
    pt10: {
      paddingTop: 10,
    },
    imgContainer: {
      width: 400,
      height: 400,
      alignSelf: 'center',
      borderRadius: 400,
    },
  });
};

export default dynamicStyles;
