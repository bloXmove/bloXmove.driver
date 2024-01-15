import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {createAccount} from '../../utils/api/actions';
import {displayErrors} from '../../../helpers/displayErrors';

const ConfirmVerification = props => {
  const {navigation, route} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const userData = route.params.data;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  let currentTheme = appStyles.navThemeConstants[colorScheme];
  const [insType, setType] = useState(0);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="arrow-back-outline"
            size={30}
            color={currentTheme.fontColor}
          />
        </TouchableOpacity>
      ),
      headerTitle: 'Onboarding',
    });
  }, []);

  const confirm = () => {
    setLoading(true);
    createAccount(userData)
      .then(response => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Processing',
              params: {
                isSigningUp: true,
                appStyles: appStyles,
                appConfig: appConfig,
                userData: userData,
              },
            },
          ],
        });
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={appStyles.iconSet.city}
        size={200}
        color="white"
      />
      <View style={styles.boxContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.topTitle}>Vehicle Inspectors</Text>
          <TouchableOpacity
            style={[
              styles.insContainer,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                borderWidth: insType === 0 ? 1 : 0,
              },
            ]}
            onPress={() => setType(0)}>
            <Text style={styles.subTitle}>
              GDA Vehicle Inspection Service 6A Fani-keyode {userData.address},{' '}
              {userData.state}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.insContainer,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                borderWidth: insType === 1 ? 1 : 0,
              },
            ]}
            onPress={() => setType(1)}>
            <Text style={styles.subTitle}>
              Sample Inspection Service 6A Fani-keyode {userData.address},{' '}
              {userData.state}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          The following credentical / item should be taken for inspection at one
          of the above displayed inspector:
        </Text>
        <View style={styles.conFlexContainer}>
          <Text style={styles.smTitle}>1. National ID: </Text>
          <Text style={styles.text}>{userData.nationalID}</Text>
        </View>
        <View style={styles.conFlexContainer}>
          <Text style={styles.smTitle}>2. Driver's Licence: </Text>
          <Text style={styles.text}>{userData.driverLicenseNo}</Text>
        </View>
        <View style={styles.conFlexContainer}>
          <Text style={styles.smTitle}>3. Vehicle and Registration:</Text>
          <Text style={styles.text}>{userData.vehicleRegistrationNo}</Text>
        </View>
        <View style={styles.flexContainer}>
          <TouchableOpacity
            style={styles.btnHalfContainer}
            onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnHalfContainer}
            onPress={() => confirm()}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.btnText}>Confirm</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

ConfirmVerification.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default ConfirmVerification;
