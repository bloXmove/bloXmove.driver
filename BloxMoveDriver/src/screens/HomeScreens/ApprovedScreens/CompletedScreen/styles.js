import {StyleSheet} from 'react-native';
import {COLORS} from '@components';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
  },
  gray: {
    color: COLORS.body,
  },
  price: {
    color: COLORS.primary,
  },
  paymentInfo: {
    paddingHorizontal: 30,
    marginTop: 20,
    flexDirection: 'row',
  },
  topContent: {
    paddingHorizontal: 32,
    paddingBottom: 11,
  },
  content: {
    paddingHorizontal: 30,
    paddingVertical: 35,
  },
  detailTitle: {
    marginTop: 16,
  },
  details: {
    flexDirection: 'row',
    paddingBottom: 6,
  },
  detailsTitle: {
    flex: 1,
    paddingRight: 8,
  },
  detailsDescription: {
    flex: 1,
    color: COLORS.body,
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
});
