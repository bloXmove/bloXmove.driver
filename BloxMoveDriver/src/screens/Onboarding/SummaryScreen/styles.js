import {StyleSheet} from 'react-native';
import {COLORS} from '@components';
const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    safeview: {
      flexGrow: 1,
      backgroundColor: COLORS.white,
    },
    image: {
      height: 40,
      width: 40,

      marginTop: 40,
      marginBottom: 20,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      paddingHorizontal: 32,

      justifyContent: 'space-between',
      flexGrow: 1,
      marginBottom: 20,
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
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contentWrapper: {
      // marginVertical: 32,
    },
    headerTitle: {
      marginLeft: 33,
    },
    title: {
      marginBottom: 24,
    },
    subTitle: {
      marginTop: 10,
      marginBottom: 24,
    },
    desText: {
      color: COLORS.body,
    },
    description: {
      color: COLORS.body,
      marginBottom: 24,
    },
    button: {
      width: '48%',
    },
    buttonLoadingMain: {
      width: '48%',
      backgroundColor: COLORS.disabled,
    },
    video: {
      marginTop: 15,
      marginBottom: 40,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderWidth: 1,
      borderColor: COLORS.form,
      borderRadius: 100,
    },
    imagePickerModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    imagePickerContent: {
      backgroundColor: COLORS.white,

      padding: 32,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    imagePickerButtonContainer: {
      flexDirection: 'row',

      justifyContent: 'space-around',
    },
    imagePickerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imagePickerButton: {
      justifyContent: 'center',
      alignItems: 'center',

      paddingTop: 20,
    },
    cameraIcon: {
      position: 'absolute',
      right: 0,
      bottom: 0,

      backgroundColor: COLORS.primary,
      padding: 4,
      borderRadius: 20,
    },

    deleteAvatar: {
      position: 'absolute',
      right: 0,
      bottom: 0,

      backgroundColor: COLORS.disabled,
      padding: 4,
      borderRadius: 20,
    },
  });
};

export default dynamicStyles;
