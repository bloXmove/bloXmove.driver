import React from 'react';
import {View, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, Text} from '../../../../components';
import Moment from 'moment';
import {Addresses} from '../components/Addresses/Addresses';
import {Driver} from '../components/Driver/Driver';
import {styles} from './styles';
import {Map} from '../components/Map/Map';
import {calcuateDuration} from '@app/src/helpers';
import {TYPES} from '@app/src/lib/constants';
import {currencyFormat} from '@app/src/helpers';

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

const CompletedScreen = props => {
  const {navigation, route} = props;
  const item = route.params.item;
  const jourRequest = route?.params?.jourRequest;
  const requestData = route.params.item?.journeyRequest;
  const backFlag = route.params.backFlag;

  const getColor = status => {
    const type = STATUSES.find(detail => detail.value === status).type;
    return type === TYPES.CANCELED
      ? COLORS.error
      : type === TYPES.COMPLETED
      ? COLORS.primary
      : COLORS.warning;
  };

  const getStatus = status => {
    const label = STATUSES.find(detail => detail.value === status).label;
    return label ? label : status;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              backFlag ? navigation.navigate('MyRides') : navigation.goBack();
            }}>
            <Icon name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text textStyle="body18Semibold">Ride Details</Text>
        </View>
        <Addresses from={requestData?.from?.name} to={requestData?.to?.name} />

        <Map from={jourRequest?.from} to={jourRequest?.to} />
        <View style={styles.topContent}>
          <Text
            textStyle="body18Semibold"
            style={{color: getColor(item?.status)}}>
            {getStatus(item?.status)}
            {/* {STATUSES.find(status => status.value === item?.status).label} */}
          </Text>
          <Text textStyle="body14SemiBold" style={styles.detailTitle}>
            Passenger Details
          </Text>
        </View>
        <Driver item={item} />
        <View style={styles.paymentInfo}>
          <Text textStyle="body18Semibold">Price </Text>
          <Text textStyle="body18Semibold" style={styles.price}>
            ₦{currencyFormat(requestData.price)}
          </Text>
        </View>
        <View style={styles.content}>
          <Text textStyle="body14SemiBold">Other Details</Text>
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Ride ID</Text>
            <Text style={styles.detailsDescription}>{item?.id}</Text>
          </View>
          {item.status !== 'PASSENGER_CANCELED' &&
            item.status !== 'DRIVER_CANCELED' && (
              <>
                <View style={styles.details}>
                  <Text style={styles.detailsTitle}>Arrival time:</Text>
                  <Text style={styles.detailsDescription}>
                    {Moment.unix(
                      (Number.parseInt(jourRequest.pickUpTime, 10) +
                        item.eta.toFixed(0) * 60000) /
                        1000,
                    ).format('h:mm a Do MMM, YYYY')}
                  </Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.detailsTitle}>Departure time:</Text>
                  <Text style={styles.detailsDescription}>
                    {Moment.unix(jourRequest.pickUpTime / 1000).format(
                      'h:mm a Do MMM, YYYY',
                    )}
                  </Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.detailsTitle}>Ride duration:</Text>
                  <Text style={styles.detailsDescription}>
                    {calcuateDuration(item.eta)}
                  </Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.detailsTitle}>Distance:</Text>
                  <Text style={styles.detailsDescription}>
                    {(item.distance / 1000).toFixed(2)} km
                  </Text>
                </View>
              </>
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompletedScreen;
