import {StyleSheet} from 'react-native';

const dynamicStyles = () => {
  return StyleSheet.create({
    image: {
      height: 40,
      width: 40,
    },
    container: {
      flex: 1,
    },
    scrollView: {
      marginHorizontal: 32,
      flex: 1,
      justifyContent: 'center',
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      marginBottom: 32,
    },
    centerContainer: {},
    button: {
      marginTop: 20,
      width: '100%',
    },
    header: {
      top: 40,
      marginBottom: 60,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'absolute',
      width: '100%',
    },
    btnToggle: {
      position: 'absolute',
      left: 0,
    },
  });
};

export default dynamicStyles;
