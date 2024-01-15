import {COLORS, FONTS} from '@components';
import {StyleSheet} from 'react-native';

const dynamicStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: COLORS.white,
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderWidth: 1,
      borderColor: COLORS.form,
      borderRadius: 40,
    },
    row: {
      flexDirection: 'row',
    },

    header: {
      alignItems: 'center',
      justifyContent: 'space-between',

      marginBottom: 16,
      padding: 32,
    },
    content: {
      paddingHorizontal: 32,
    },
    inputContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
    },
    inputLabel: {
      width: '50%',
    },
    backButton: {
      marginRight: 32,
    },
    divider: {
      height: 8,
      backgroundColor: COLORS.form,
    },
    userData: {
      marginBottom: 16,
      color: COLORS.body,
      width: '50%',
    },
    addressData: {
      marginBottom: 16,
      color: COLORS.body,
    },
    sectionTitle: {
      marginBottom: 16,
      marginTop: 8,
    },
    button: {
      flexDirection: 'row',

      paddingHorizontal: 32,
      paddingVertical: 16,
    },

    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 32,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: '100%',
    },
    description: {
      color: COLORS.body,

      marginVertical: 24,
    },
    centered: {
      textAlign: 'center',
    },
    buttonMargin: {
      marginBottom: 8,
    },
    editButton: {
      padding: 8,
    },
  });
};

export default dynamicStyles;
