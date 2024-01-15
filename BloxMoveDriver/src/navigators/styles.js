import {StyleSheet} from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 30,
      justifyContent: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
      paddingVertical: 60,
    },
    menuContainer: {
      paddingTop: 30,
    },
    btnText: {
      color: appStyles.colorSet[colorScheme].blackColor,
      fontWeight: '500',
      fontSize: 20,
      lineHeight: 24,
      marginLeft: 10,
      fontFamily: 'Poppins-Regular',
    },
    logoutContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 50,
    },
    flexContainer: {
      flexDirection: 'row',
    },
    btnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 30,
      paddingVertical: 10,
      width: '100%',
    },
    name: {
      color: 'white',
      fontWeight: '700',
      fontFamily: 'Poppins-Regular',
      fontSize: 20,
      lineHeight: 20,
      paddingTop: 20,
    },
    accountID: {
      color: 'white',
      fontWeight: '500',
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      lineHeight: 20,
      paddingTop: 10,
    },
    btnIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
      tintColor: appStyles.colorSet[colorScheme].blackColor,
    },
    navIcon: {
      color: 'black',
    },
  });
};

export default dynamicStyles;
