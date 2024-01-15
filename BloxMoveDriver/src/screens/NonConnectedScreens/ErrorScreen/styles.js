import {COLORS} from '@components';
import {StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    content: {
      padding: 32,
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
      position: 'absolute',
      top: 32,
      left: 32,
    },
  });

export default styles;
