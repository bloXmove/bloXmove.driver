const {COLORS} = require('@components');
const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  container: {
    padding: 32,
    flexGrow: 1,

    backgroundColor: COLORS.white,

    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 32,
  },
  backButton: {
    marginRight: 32,
  },
  driverInfo: {
    alignItems: 'center',
  },
  rating: {
    marginVertical: 24,
  },
  profile: {
    marginVertical: 24,
  },
});
