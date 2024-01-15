import {COLORS} from '@components';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexGrow: 1,
  },
  inner: {
    paddingHorizontal: 32,
    paddingTop: 20,
    backgroundColor: COLORS.white,

    flexGrow: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  description: {
    color: COLORS.body,
    marginTop: 4,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 16,
  },
  backButton: {
    marginRight: 24,
  },
  listContainer: {
    marginTop: 20,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
});
