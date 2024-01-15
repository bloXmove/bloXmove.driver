import {StyleSheet} from 'react-native';
import {COLORS} from '@components';

const dynamicStyles = () => {
  return StyleSheet.create({
    image: {
      height: 40,
      width: 40,

      marginTop: 40,
      marginBottom: 60,
      alignSelf: 'center',
    },
    container: {
      flex: 1,
    },
    scrollView: {
      marginHorizontal: 32,
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      marginBottom: 32,
    },
    text: {
      color: COLORS.body,
      marginTop: 24,
      marginBottom: 36,
    },
    button: {
      width: '100%',
      marginVertical: 33,
    },
    btnToggle: {
      position: 'absolute',
      marginTop: 50,
      zIndex: 10,
    },
  });
};

export default dynamicStyles;
