import {StyleSheet, Dimensions, Platform} from 'react-native';
import {COLORS} from '@components';

const width = Dimensions.get('window').width;
const codeInptCellWidth = width * 0.08;

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
      // marginBottom: 32,
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
    marginHeaderContainer: {
      flexDirection: 'row',
      marginTop: 40,
      marginBottom: 24,
      alignItems: 'center',
      marginHorizontal: 32,
    },
    headerContainer: {
      flexDirection: 'row',
      marginTop: 40,
      marginBottom: 24,
      alignItems: 'center',
    },
    title: {
      // marginLeft: 33,
    },
    qrBox: {
      backgroundColor: COLORS.header,
      flex: 1,
    },
    qrText: {
      color: COLORS.white,
      paddingHorizontal: 32,
      paddingVertical: 16,
      backgroundColor: COLORS.header,
    },
    qrOutContainer: {
      // backgroundColor: 'white',
    },
    qrCamera: {
      width: 280,
      height: 280,
      alignSelf: 'center',
      borderRadius: 16,
      overflow: 'hidden',
      borderColor: COLORS.primary,
      borderWidth: 4,
    },
    notAuthContainer: {
      justifyContent: 'center',
      flex: 1,
    },

    codeInputCell: {
      width: codeInptCellWidth,
      height: 45,
      fontSize: Platform.os === 'ios' ? 26 : 20,
      fontFamily: 'Poppins-Regular',
      fontWeight: '400',
      textAlign: 'center',
      color: COLORS.black,
      backgroundColor: COLORS.white,
      paddingBottom: 0,
      paddingTop: 0,
      marginLeft: 8,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: COLORS.form,
      marginTop: 24,
    },
    focusCell: {
      // borderColor: '#000',
      paddingBottom: 5,
    },
    qrBG: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  });
};

export default dynamicStyles;
