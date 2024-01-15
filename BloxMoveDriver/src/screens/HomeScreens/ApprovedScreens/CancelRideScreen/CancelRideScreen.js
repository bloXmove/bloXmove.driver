import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  TouchableOpacity,
  useColorScheme,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';

import Icon from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-radio-buttons-group';
import {journeyCancel, journeyDetail} from '../../utils/api/jonuney';
import {displayErrors} from '../../../../helpers/displayErrors';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentData} from '../../../../helpers/getPermission';
import {nftAPI} from '../../utils';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {setCurrent} from '../../redux/actions';
import {Text, COLORS, Button} from '@components';
import {reasonList} from '@app/src/lib/constants';

const CancelRideScreen = props => {
  const {route, navigation} = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const item = route.params.item;
  const iterval = route.params.iterval;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const [acc, setAcc] = useState('');
  const [loading, setLoading] = useState(false);
  const {provider} = useWalletConnectModal();
  const accountId = useSelector(state => state.auth.user.walletAddress);
  const dispatch = useDispatch();
  let currentTheme = appStyles.navThemeConstants[colorScheme];
  const apiToken = useSelector(state => state.auth.token);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            props.navigation.navigate('Approved', {
              appStyles: appStyles,
              appConfig: appConfig,
              item: item,
            });
          }}>
          <Icon
            name="arrow-back-outline"
            size={30}
            color={currentTheme.fontColor}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const cancelRide = async () => {
    const curData = await getCurrentData();
    if (curData === 'fail') {
      return;
    }
    setLoading(true);
    const signature = await nftAPI.getSignature(accountId, provider, curData);
    if (signature.success !== true) {
      setLoading(false);
      Alert.alert('Please confirm transaction', '');
      return;
    }
    const data = {
      cancellationReason: acc === '' ? 'NO_REASON' : acc,
    };
    journeyCancel(item.id, data, apiToken)
      .then(response => {
        clearInterval(iterval);
        console.log(response.data);
        console.log('cancel from cancel ride screen request');
        // getJourney(apiToken, item.id);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };
  const getJourney = async (token, id) => {
    journeyDetail(id, token)
      .then(response => {
        navigation.navigate('Completed', {
          item: response.data.data,
          jourRequest: response.data.data.journeyRequest,
          backFlag: true,
        });
        dispatch(setCurrent({data: ''}));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            disabled={loading}
            onPress={() =>
              props.navigation.navigate('Approved', {
                appStyles: appStyles,
                appConfig: appConfig,
                item: item,
              })
            }>
            <Icon name="arrow-back-outline" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text textStyle="body18Semibold">Cancelation Reason</Text>
        </View>
        <View style={styles.cancelBoxContainer}>
          <Text textStyle="body14Regular" style={styles.topText}>
            Please tell us the reason why you are canceling your ride .
          </Text>
          {reasonList.map(itemReas => {
            return (
              <TouchableOpacity
                onPress={() => setAcc(itemReas)}
                key={itemReas}
                style={styles.selectContainer}>
                <RadioButton
                  selected={acc === itemReas ? true : false}
                  color={COLORS.primary}
                  borderColor={COLORS.form}
                  size={20}
                />
                <Text textStyle="body18Regular" style={styles.text}>
                  {itemReas.replace(/_/g, ' ')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          title="Submit"
          disabled={loading}
          onPress={cancelRide}
          containerStyle={styles.btnCancel}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

CancelRideScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
};

export default CancelRideScreen;
