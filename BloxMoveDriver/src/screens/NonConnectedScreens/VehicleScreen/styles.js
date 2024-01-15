import {Platform, StyleSheet} from 'react-native';

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
    centerContainer: {
      alignItems: 'center', 
      justifyContent: 'center',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
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
    },
    rightContainer: {
      borderLeftWidth: 0,
      borderTopStartRadius: 0,
      borderBottomStartRadius: 0,
    },
    inputIconContainer: {
      position: 'absolute',
      right: 25,
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    text: {
      fontSize: 16,
      textAlign: 'left',
      color: appStyles.colorSet[colorScheme].blackColor,
      paddingTop: 10,
      paddingBottom: 5,
    },
    btnContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      paddingHorizontal: 10,
      paddingVertical: 13,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '40%',
      marginRight: 20,
    },
    btnText: {
      color: 'white'
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
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    typeCon: {
      padding: 20,
      // marginTop : 50,
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
    makerImg: {
      width: 50,
      height: 50,
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
    // image : {
    //     width : 50,
    //     height : 50,
    //     marginBottom : 20,
    // },
    image: {
      width: '100%',
      position: 'absolute',
      height: 200,
    },
    boxContainer: {
      width: '90%',
      padding: 20,
      marginTop: 50,
      marginLeft: '5%',
      backgroundColor: 'white',
      marginBottom: Platform.OS === 'ios' ? 0 : 50,
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
    btnToggle: {
      marginLeft: 20,
    },
  });
};

export default dynamicStyles;
