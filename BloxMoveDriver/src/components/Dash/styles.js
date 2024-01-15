import {StyleSheet} from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    container: {
      paddingLeft: 10,
    },
    dotIcon: {
      backgroundColor: appStyles.colorSet[colorScheme].grey9,
      width: 1.5,
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      height: 2,
      marginBottom: 3,
    },
  });
};

export default dynamicStyles;
