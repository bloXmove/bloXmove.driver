import {StyleSheet} from 'react-native';
import {COLORS} from '@components';

const dynamicStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: COLORS.white,
      flexGrow: 1,
    },
    cancelText: {
      color: COLORS.error,
      textDecorationLine: 'underline',
    },
    cancelBoxContainer: {
      paddingHorizontal: 32,
      marginVertical: 20,
    },
    selectContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 7,
    },
    btnCancel: {
      position: 'absolute',
      bottom: 20,
      width: '90%',
      alignSelf: 'center',
    },
    checkBox: {
      width: 16,
      height: 16,
      marginRight: 16,
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
    text: {
      textTransform: 'capitalize',
    },
    topText:{
      color: COLORS.body,
      marginVertical: 20,
    },
  });
};

export default dynamicStyles;
