import {StyleSheet} from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    innerContainer: {
      flex: 0.9,
      width: '90%',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    title: {
      fontSize: 24,
      lineHeight: 36,
      fontWeight: '600',
      textAlign: 'center',
      paddingBottom: 25,
      fontFamily: 'Poppins-SemiBold',
      color: appStyles.colorSet[colorScheme].blackColor,
    },
    imgage: {
      alignSelf: 'center',
    },
    mainText: {
      fontSize: 24,
      lineHeight: 36,
      fontWeight: '600',
      textAlign: 'center',
      fontFamily: 'Poppins-SemiBold',
      color: appStyles.colorSet[colorScheme].mainColor,
    },
    btnContainer: {
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      paddingVertical: 18,
      borderRadius: 24,
      width: '90%',
      alignSelf: 'center',
      marginBottom: 40,
    },
    btnText: {
      fontSize: 18,
      fontWeight: '600',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      textAlign: 'center',
      fontFamily: 'Poppins-SemiBold',
    },
    button: {
      fontSize: 18,
      color: 'white',
      marginTop: 10,
    },
    dotStyle: {
      backgroundColor: appStyles.colorSet[colorScheme].grey0,
      width: 16,
      height: 4,
    },
    activatedDot: {
      color: appStyles.colorSet[colorScheme].mainColor,
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      width: 16,
      height: 4,
    },
    skipButton: {
      alignItems: 'center',
      marginTop: 50,
    },
    skipText: {
      color: '#BEC2CE',
      fontSize: 17,
      fontWeight: '600',
    },
    startButton: {
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 50,

      color: '#0A1F44',
      backgroundColor: appStyles.colorSet[colorScheme].mainColor,
      paddingHorizontal: 50,
      paddingVertical: 13,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '80%',
    },
    startText: {
      fontSize: 17,
      lineHeight: 20,
      fontWeight: '600',
      color: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
  });
};

export default dynamicStyles;
