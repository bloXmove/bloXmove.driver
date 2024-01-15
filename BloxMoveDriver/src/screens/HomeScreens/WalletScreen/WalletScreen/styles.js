import {COLORS, FONTS} from '@components';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
  },
  balance: {
    margin: 32,
    marginTop: 0,
    padding: 24,

    backgroundColor: COLORS.form,
    borderRadius: 16,
  },
  balanceTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginTop: 16,
  },
  halfButton: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,

    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: '50%',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    height: 40,
    borderRadius: 20,

    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  cards: {
    padding: 32,
    margin: 0,
  },
  bankContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  bankNumber: {
    marginLeft: 24,
  },
  addCardButton: {
    flexDirection: 'row',

    paddingVertical: 16,
  },
  addCardText: {
    marginLeft: 16,
    textDecorationLine: 'underline',
    color: COLORS.primary,
  },

  modal: {
    backgroundColor: COLORS.white,
    flexGrow: 1,

    justifyContent: 'space-between',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 32,
  },
  backButton: {
    marginRight: 32,
  },
  cardInputLabel: {
    fontFamily: FONTS.regular,
    color: COLORS.form,
    paddingLeft: 8,
  },
  cardInput: {
    fontFamily: FONTS.regular,
    paddingLeft: 8,
  },
  cardInputContainer: {
    borderColor: COLORS.form,
    borderRadius: 8,
    marginVertical: 8,

    borderWidth: 2,
  },

  divider: {
    height: 8,
    backgroundColor: COLORS.form,
  },
  promotions: {
    marginBottom: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 32,
  },
  balanceContainer: {
    margin: 32,
    marginTop: 0,
    // padding: 24,

    backgroundColor: COLORS.form,
    borderRadius: 16,
    overflow: 'hidden',
  },
  insideContainer: {
    padding: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  whiteText: {
    color: COLORS.white,
  },
  activeTab: {
    backgroundColor: COLORS.pressed,
    width: '50%',
    alignItems: 'center',
    paddingVertical: 14,
  },
  nonActiveTab: {
    backgroundColor: COLORS.primary,
    width: '50%',
    alignItems: 'center',
    paddingVertical: 14,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  loadingContainer: {height: 40},
});
