import {StyleSheet} from 'react-native';
import {COLORS} from '@components';
const dynamicStyles = () => {
  return StyleSheet.create({
    safeview: {
      flexGrow: 1,
      backgroundColor: COLORS.white,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    scrollView: {
      marginHorizontal: 32,
    },
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      marginBottom: 32,
      paddingBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    headerContainer: {
      flexDirection: 'row',
      marginTop: 80,
      marginBottom: 24,
      alignItems: 'center',
    },
    topContainer: {
      marginTop: 80,
      marginBottom: 24,
      alignItems: 'center',
    },
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      marginLeft: 33,
    },
    progress: {
      alignSelf: 'center',
      marginBottom: 24,
    },
    title: {
      marginBottom: 24,
    },
    subTitle: {
      marginTop: 10,
      marginBottom: 16,
    },
    desText: {
      color: COLORS.body,
    },
    description: {
      color: COLORS.body,
      marginBottom: 24,
    },
    bold: {
      color: COLORS.body,
    },
    buttonTop: {
      width: '100%',
      marginBottom: 15,
    },
    button: {
      width: '100%',
    },
    video: {
      marginTop: 15,
      marginBottom: 40,
    },
    divider: {
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      marginBottom: 16,
    },
    btnLeft: {
      marginLeft: 33,
    },
    iconContainer: {
      width: 92,
      height: 92,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.error,
      alignSelf: 'center',
      marginBottom: 55,
    },
    backIcon: {
      position: 'absolute',
      marginTop: 50,
    },
    closeIcon: {
      position: 'absolute',
      marginTop: 50,
      right: 0,
    },
    colorText: {
      color: COLORS.primary,
      textDecorationLine: 'underline',
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    iconContact: {
      marginLeft: 5,
    },
  });
};

export default dynamicStyles;
