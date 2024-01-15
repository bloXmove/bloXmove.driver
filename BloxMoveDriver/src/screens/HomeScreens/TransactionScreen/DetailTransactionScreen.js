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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {Dash} from '../../../components';

const DetailTransactionScreen = props => {
  const {navigation, route} = props;
  const appStyles = route.params.appStyles;
  const item = route.params.item;
  const data = route.params.data;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  let currentTheme = appStyles.navThemeConstants[colorScheme];

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.btnToggle}
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            size={30}
            color={currentTheme.fontColor}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollDetailContainer}
        keyboardShouldPersistTaps="handled">
        <Image
          style={styles.image}
          source={appStyles.iconSet.city}
          size={200}
          color="white"
        />
        <TouchableOpacity activeOpacity={1} style={styles.boxDetailContainer}>
          <View style={styles.leftBox}>
            <Text style={styles.subTitle}>Transaction ID</Text>
            <Text style={styles.text}>{item.transactionId}</Text>
          </View>
          <View style={styles.leftBox}>
            <Text style={styles.subTitle}>Date</Text>
            <Text style={styles.text}>
              {new Date(item.createdAt).toLocaleDateString('en-GB')}
            </Text>
          </View>
          <View style={styles.leftBox}>
            <Text style={styles.subTitle}>Total Price</Text>
            <Text style={styles.text}>NGN {data.totalPrice}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.transubBox}>
            <View style={styles.leftDetContainer}>
              <Icon
                name="radio-button-on-outline"
                size={25}
                color={appStyles.colorSet[colorScheme].mainColor}
              />
              <Dash appStyles={appStyles} />
              <Icon name="location-outline" size={25} color={'red'} />
            </View>
            <View style={styles.rightDesContainer}>
              <Text style={styles.depRideText}>
                {item.paymentType === 'NFTICKET'
                  ? JSON.parse(item.content).pickupLocationName
                  : ''}
              </Text>
              <View style={styles.divider} />
              <Text style={styles.desRideText}>
                {item.paymentType === 'NFTICKET'
                  ? JSON.parse(item.content).endLocationName
                  : ''}
              </Text>
            </View>
          </View>
          <View style={styles.blankContainer} />
          <View style={styles.leftBox}>
            <Text style={styles.subTitle}>Payment Type</Text>
            <Text style={styles.text}>{item.paymentType}</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

DetailTransactionScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default DetailTransactionScreen;
