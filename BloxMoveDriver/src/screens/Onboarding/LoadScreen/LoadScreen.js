import React, {useEffect} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import deviceStorage from '../../utils/AuthDeviceStorage';
import {useDispatch} from 'react-redux';
import {getManufacture} from '@app/src/screens/utils/api/actions';

const LoadScreen = props => {
  const {navigation, route} = props;

  const dispatch = useDispatch();

  const appStyles = route.params.appStyles;
  const appConfig = route.params.appConfig;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setAppState();
    });
    return unsubscribe;
  }, [navigation]);

  const setAppState = async () => {
    // Show Non Verified flow
    dispatch(getManufacture());
    await deviceStorage.getUserType();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'LoginStack',
          params: {appStyles: appStyles, appConfig: appConfig},
        },
      ],
    });
  };

  return <View />;
};

LoadScreen.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
};

LoadScreen.navigationOptions = {
  header: null,
};

export default LoadScreen;
