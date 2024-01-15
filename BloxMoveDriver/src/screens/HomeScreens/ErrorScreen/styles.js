import {COLORS} from '@components';
import {StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    title: {
      color: COLORS.black,
      textAlign: 'center',
    },
    subTitle: {
      color: COLORS.body,
      textAlign: 'center',
      marginTop: 8,
      width: '90%',
      alignSelf: 'center',
    },
    btnContainer: {
      width: '90%',
      position: 'absolute',
      bottom: 100,
      alignSelf: 'center',
    },
  });

export default styles;
