import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, TNActivityIndicator, Text} from '@components';
import {connect, useSelector, useDispatch} from 'react-redux';
import {getTransactions, retryWithdraw} from '../utils/api/payment';
import moment from 'moment';
import {styles} from './styles';
import {setTransactionList, updatePaymentLoading} from '../redux/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {displayErrors} from '@app/src/helpers';
import {nftAPI, paymentAPI} from '../utils';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';
import {currencyFormat} from '@app/src/helpers';

const TRANSACTION_TYPE = {
  TOP_UP: {label: 'Top Up', symbol: '+'},
  REFUND: {label: 'Refund', symbol: '+'},
  WITHDRAW: {label: 'Withdraw', symbol: '-'},
  END_JOURNEY: {label: 'Ride Fee', symbol: '+'},
  CANCEL_JOURNEY: {label: 'Cancelation Fee', symbol: '+'},
};

const TransactionScreen = props => {
  const {navigation} = props;

  // const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  // const [filteredData, setFilter] = useState([]);
  const filteredData = useSelector(state => state.payment.transactionList);
  const [localData, setFilter] = useState([]);
  const loading = useSelector(state => state.payment.loading);
  const apiToken = useSelector(state => state.auth.token);

  const accountId = useSelector(state => state.auth.user.walletAddress);
  const [retryLoading, setLoading] = useState(false);
  const {provider} = useWalletConnectModal();
  const dispatch = useDispatch();

  useEffect(() => {
    listTransactions();
  }, []);

  const listTransactions = async () => {
    dispatch(
      updatePaymentLoading({
        loading: true,
      }),
    );
    const url = 'page=' + pageNum + '&size=20&sort=DESC';
    // dispatch(getTransactions(apiToken, url, pageNum));
    // setPageNum(pageNum + 1);
    getTransactions(apiToken, url)
      .then(response => {
        const oldData = localData;
        const newData = oldData.concat(response.data.data);
        setFilter(newData);
        setPageNum(pageNum + 1);
        dispatch(
          setTransactionList({
            data: newData,
            loading: false,
          }),
        );
      })
      .catch(error => {
        console.log('Error: ', error.response);
        dispatch(
          updatePaymentLoading({
            loading: false,
          }),
        );
      });
  };

  const updateStatus = data => {
    const updatedData = filteredData.map(item => {
      if (item.id === data.id) {
        return {...item, status: 'PROCESSING'};
      }
      return item;
    });
    dispatch(setTransactionList({data: updatedData, loading: false}));
  };
  const retryWithdrawal = async item => {
    setLoading(true);
    const withdrawaStatus = await paymentAPI.checkWithdrawStatus(apiToken);
    if (withdrawaStatus !== false) {
      withdrawaStatus === true
        ? Alert.alert(
            '',
            'Please wait for a while, there has already a processing withdraw order there.',
          )
        : '';
      setLoading(false);
      return;
    }
    retryWithdraw(item.transactionId, apiToken)
      .then(response => {
        const command = response.data.data.paymentCommand;
        completeWithdrawal(command, item.totalPrice, item);
      })
      .catch(error => {
        setLoading(false);
        displayErrors(error);
      });
  };
  const completeWithdrawal = async (data, amount, item) => {
    const signature = await nftAPI.approveERC(
      amount,
      accountId,
      data.value[0],
      data.value[1],
      provider,
    );
    if (signature.success !== true) {
      Alert.alert('Please authorize payment', '', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => completeWithdrawal(data, amount, item)},
      ]);
      setLoading(false);
      return;
    }
    updateStatus(item);
    setLoading(false);
  };

  const Item = ({item}) => {
    return (
      (item.status === 'SUCCESS' ||
        item.status === 'PROCESSING' ||
        (item.status === 'FAILURE' && item.type === 'WITHDRAW')) && (
        <View style={styles.item}>
          <View>
            <Text textStyle="body18Regular">
              {TRANSACTION_TYPE[item?.type]?.label}
            </Text>
            <Text style={styles.description} textStyle="body14Regular">
              {moment(new Date(item?.createdAt)).format('h:mm a Do MMM, YYYY')}
            </Text>
            <Text style={styles.description} textStyle="body14Regular">
              Transaction ID: {item?.id}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text
              textStyle="body18Semibold"
              style={{
                color:
                  TRANSACTION_TYPE[item?.type]?.symbol === '+'
                    ? COLORS.primary
                    : COLORS.error,
              }}>
              {TRANSACTION_TYPE[item?.type]?.symbol}
              {currencyFormat(item.totalPrice)}
            </Text>
            <Text
              textStyle="body10Regular"
              style={{
                color:
                  item.status === 'SUCCESS'
                    ? COLORS.success
                    : item.status === 'PROCESSING'
                    ? COLORS.yellow
                    : COLORS.error,
              }}>
              {item.status === 'SUCCESS' ? 'COMPLETED' : item.status}
            </Text>
            {item.status === 'FAILURE' && item.type === 'WITHDRAW' && (
              <TouchableOpacity
                disabled={loading || retryLoading}
                onPress={() => retryWithdrawal(item)}>
                <Ionicons
                  name="refresh"
                  color={retryLoading ? COLORS.form : COLORS.black}
                  size={25}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} content={JSON.parse(item.content)} />
  );
  const emptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text textStyle="body18Regular">
          You don’t have any transaction yet
        </Text>
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
            onPress={() => {
              navigation.navigate('Wallet');
            }}>
            <Icon name="arrowleft" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text textStyle="body18Semibold">Transaction History</Text>
        </View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={emptyComponent}
          onRefresh={() => listTransactions()}
          refreshing={loading}
          onEndReached={() => listTransactions()}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          style={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({payment}) => {
  return {
    transactionList: payment.transactionList,
    rate: payment.rate,
    loading: payment.loading,
  };
};

export default connect(mapStateToProps, {})(TransactionScreen);
