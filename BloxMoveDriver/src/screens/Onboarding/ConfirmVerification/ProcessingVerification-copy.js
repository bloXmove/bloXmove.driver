import React, {useState, useEffect, useLayoutEffect} from 'react';
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
import * as Progress from 'react-native-progress';
import deviceStorage from '../../utils/AuthDeviceStorage';
import {useDispatch} from 'react-redux';
import {
  getToken,
  getVerificationStatus,
  loginActions,
  updateVerificationStatus,
} from '../../utils/api/actions';
import {displayErrors} from '../../../helpers/displayErrors';

const ProcessingVerification = props => {
  const {navigation, route} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const userData = route.params.userData;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  let currentTheme = appStyles.navThemeConstants[colorScheme];

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserStatus();
  }, []);

  const getUserStatus = () => {
    const accountId = userData.walletAddress;
    setLoading(true);
    updateVerificationStatus(accountId)
      .then(response => {
        getVerificationStatus(accountId);
        setLoading(false);
      })
      .catch(error => {
        displayErrors(error);
      });
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: '',
      headerTitle: 'Verification Partner',
    });
  }, []);

  const completed = async () => {
    await deviceStorage.setShouldShowOnboardingFlow('true');
    await deviceStorage.setAccount(userData);
    await deviceStorage.setUserType(userData.driverType);
    const accountId = userData.walletAddress;
    setLoading(false);
    const result = await getToken(accountId, 'INDIVIDUAL');
    if (result.success === true) {
      const token = result.data.token;
      dispatch(loginActions(token));
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
            params: {appStyles: appStyles, appConfig: appConfig},
          },
        ],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={appStyles.iconSet.city}
        size={200}
        color="white"
      />
      <View
        style={[
          styles.boxContainerProcessing,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            paddingBottom: loading ? 30 : 100,
          },
        ]}>
        <Progress.Circle
          size={290}
          thickness={3}
          showsText={!loading ? true : false}
          progress={!loading ? 1 : 1}
          animated={!loading ? false : true}
          indeterminate={!loading ? false : true}
        />
        {
          <TouchableOpacity
            style={styles.btnContainer}
            disabled={loading}
            onPress={() => completed()}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.btnText}>Continue to bloXmoveNG</Text>
            )}
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

ProcessingVerification.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default ProcessingVerification;
