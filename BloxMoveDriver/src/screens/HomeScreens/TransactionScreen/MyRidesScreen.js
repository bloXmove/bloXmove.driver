import React, {useEffect, useState} from 'react';
import {View, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import {COLORS, TNActivityIndicator, Text} from '../../../components';
import {connect, useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {getJourney} from '../utils/api/jonuney';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';
import {setCurrent} from '../redux/actions';
import {TYPES} from '@app/src/lib/constants';

// Status
// WAIT_FOR_DRIVER_ARRIVAL, STARTED, DRIVER_END, PASSENGER_CANCELED, DRIVER_CANCELED, DRIVER_ARRIVED
// In Progress: WAIT_FOR_DRIVER_ARRIVAL, STARTED, DRIVER_ARRIVED
// Completed: DRIVER_END
// Cancelled: DRIVER_CANCELED, PASSENGER_CANCELED

const STATUSES = [
  {
    label: 'Waiting for Driver',
    value: 'WAIT_FOR_DRIVER_ARRIVAL',
    type: TYPES.IN_PROGRESS,
  },
  {label: 'Started', value: 'STARTED', type: TYPES.IN_PROGRESS},
  {label: 'Completed', value: 'PASSENGER_END', type: TYPES.COMPLETED},
  {label: 'Completed', value: 'DRIVER_END', type: TYPES.COMPLETED},
  {label: 'Completed', value: 'BOTH_END', type: TYPES.COMPLETED},
  {label: 'Canceled', value: 'PASSENGER_CANCELED', type: TYPES.CANCELED},
  {label: 'Canceled', value: 'DRIVER_CANCELED', type: TYPES.CANCELED},
  {label: 'Canceled', value: 'CANCEL_APPLIED', type: TYPES.CANCELED},
  {label: 'Driver Arrived', value: 'DRIVER_ARRIVED', type: TYPES.IN_PROGRESS},
  {label: 'End Failed', value: 'END_FAILED', type: TYPES.CANCELED},
  {label: 'End Failed', value: 'CANCEL_FAILED', type: TYPES.CANCELED},
  {label: 'End Failed', value: 'FAIL_RECOVERY', type: TYPES.CANCELED},
  {label: 'Failed', value: 'DRIVER_ACCEPT_FAILED', type: TYPES.CANCELED},
];

const MyRidesScreen = props => {
  const {route, navigation} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;

  const [filteredData, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const apiToken = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFilter([]);
      setPageNum(1);
      listJourney();
    });
    return unsubscribe;
  }, [navigation]);

  const listJourney = async () => {
    setLoading(true);
    const url = 'page=' + pageNum + '&size=20&sort=DESC';
    getJourney(apiToken, url)
      .then(response => {
        setFilter(prevState => [...prevState, ...response.data.data]);
        setPageNum(pageNum + 1);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const detailTrip = (item, jourRequest) => {
    if (
      item.status === 'WAIT_FOR_DRIVER_ARRIVAL' ||
      item.status === 'STARTED' ||
      item.status === 'DRIVER_ARRIVED'
    ) {
      dispatch(setCurrent({data: item}));
      navigation.navigate('BookHail', {
        currentFlag: true,
        appStyles: appStyles,
        appConfig: appConfig,
        item: item,
      });
    } else {
      navigation.navigate('Completed', {
        item: item,
        jourRequest: jourRequest,
        appStyles: appStyles,
        appConfig: appConfig,
      });
    }
  };

  const getColor = status => {
    const type = STATUSES.find(item => item.value === status).type;
    return type === TYPES.CANCELED
      ? COLORS.error
      : type === TYPES.COMPLETED
      ? COLORS.primary
      : COLORS.warning;
  };

  const Item = ({item, jourRequest}) => {
    const color = getColor(item?.status);

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => detailTrip(item, jourRequest)}>
        <View style={styles.content}>
          <Text textStyle="body18Regular" style={styles.name}>
            {jourRequest.to.name}
          </Text>
          <Text style={styles.description}>
            {moment
              .unix(jourRequest.pickUpTime / 1000)
              .format('h:mm a Do MMM, YYYY')}
          </Text>
          <Text
            textStyle="body14SemiBold"
            style={{
              color,
            }}>
            {STATUSES.find(status => status.value === item?.status).label}
          </Text>
        </View>
        <View style={styles.icon}>
          <Icon name="right" size={20} color={COLORS.black} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} jourRequest={item.journeyRequest} />
  );
  const emptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text textStyle="body18Regular">You don’t have any ride yet</Text>
      </View>
    );
  };

  if (loading && pageNum === 1) {
    return <TNActivityIndicator />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text textStyle="body18Semibold">Ride History</Text>
        </View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={emptyComponent}
          onRefresh={() => listJourney()}
          refreshing={loading}
          onEndReached={() => listJourney()}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          style={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({journey}) => {
  return {
    journeyList: journey.journeyList,
    loading: journey.loading,
  };
};
export default connect(mapStateToProps)(MyRidesScreen);
