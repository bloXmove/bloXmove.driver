import React, {useLayoutEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';

import Icon from 'react-native-vector-icons/Ionicons';
import {Dash} from '../../../components';
import Moment from 'moment';

const CompletedRequestScreen = props => {
  const {navigation, route} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const item = route.params.item;
  const jourRequest = item.journeyRequest;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  let currentTheme = appStyles.navThemeConstants[colorScheme];

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() =>
            navigation.navigate('MyRides', {
              appStyles: appStyles,
              appConfig: appConfig,
            })
          }>
          <Icon
            name="arrow-back-outline"
            size={30}
            color={currentTheme.fontColor}
          />
        </TouchableOpacity>
      ),
      headerShown: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImg}
        source={appStyles.iconSet.city}
        size={200}
        color="white"
      />
      <View style={styles.addressBoxContainer}>
        <View style={[styles.bodyContainer, styles.flexContainer]}>
          <View style={styles.leftContainer}>
            <Icon
              name="radio-button-on-outline"
              size={25}
              color={appStyles.colorSet[colorScheme].mainColor}
            />
            <Dash appStyles={appStyles} />
            <Icon name="location-outline" size={25} color={'red'} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.depText}>{jourRequest.from.name}</Text>
            <View style={styles.divider} />
            <Text style={styles.desText}>{jourRequest.to.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.completedBoxContainer}>
        <View style={styles.headerComContainer}>
          <Text style={styles.title}>{item.status.replace(/_/g, ' ')}</Text>
        </View>
        <Image
          style={styles.carImg}
          source={
            jourRequest.car === 'CAR'
              ? appStyles.iconSet.taxiIcon
              : appStyles.iconSet.taxiIcon
          }
          size={200}
          color="white"
        />
        <View style={styles.bodyBottomContainer}>
          <Text style={styles.text}>Date : </Text>
          <Text style={styles.text}>
            {Moment(Number.parseInt(jourRequest.pickUpTime, 10)).format(
              'YYYY-MM-DD',
            )}
          </Text>
        </View>
        <View style={styles.bodyBottomContainer}>
          <Text style={styles.text}>Departure Time : </Text>
          <Text style={styles.text}>
            {Moment(Number.parseInt(jourRequest.pickUpTime, 10)).format(
              'HH:mm',
            )}
          </Text>
        </View>
        <View style={styles.bodyBottomContainer}>
          <Text style={styles.text}>Estimated Arrival : </Text>
          <Text style={styles.text}>
            {Moment(
              Number.parseInt(jourRequest.pickUpTime, 10) +
                Number.parseInt(item.eta * 60000, 10),
            ).format('HH:mm')}
          </Text>
        </View>
        <View style={styles.bodyBottomContainer}>
          <Text style={styles.text}>Duration : </Text>
          <Text style={styles.text}>{item.eta.toFixed(0)} min</Text>
        </View>
        <View style={styles.bodyBottomContainer}>
          <Text style={styles.text}>Passenger's Name : </Text>
          <Text style={styles.text}>{item.passengerName} </Text>
        </View>
        <View style={styles.bodyBottomContainer}>
          <Text style={styles.text}>Passenger's Tel : </Text>
          <Text style={styles.text}>{item.passengerPhoneNumber}</Text>
        </View>
        {(item.status === 'PASSENGER_CANCELED' ||
          item.status === 'DRIVER_CANCELED') && (
          <View>
            <View style={styles.bodyBottomContainer}>
              <Text style={styles.text}>Cancellation Reason : </Text>
              <Text style={styles.text}>
                {item.cancelReason.replace(/_/g, ' ')}
              </Text>
            </View>
            <View style={styles.bodyBottomContainer}>
              <Text style={styles.text}>Cancellation Fee : </Text>
              <Text style={styles.text}>NGN {item.cancellationFee} </Text>
            </View>
          </View>
        )}
        <View style={styles.endBottomContainer}>
          <Text style={styles.title}>Price: NGN {jourRequest.price}</Text>
        </View>
      </View>
    </View>
  );
};

CompletedRequestScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default CompletedRequestScreen;
