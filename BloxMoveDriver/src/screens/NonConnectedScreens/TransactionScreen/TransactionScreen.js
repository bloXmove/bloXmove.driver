import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, TNActivityIndicator, Text} from '@components';
import {connect, useSelector, useDispatch} from 'react-redux';
import {getTransactions} from '../utils/api/payment';
import moment from 'moment';
import {styles} from './styles';
import {setTransactionList, updatePaymentLoading} from '../redux/actions';

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
        // setLoading(false);
      });
    // setLoading(true);
    // const url = 'page=' + pageNum + '&size=20&sort=DESC';
    // getTransactions(apiToken, url)
    //   .then(response => {
    //     setFilter(prevState => [...prevState, ...response.data.data]);
    //     setPageNum(pageNum + 1);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.log('Error: ', error.response);
    //     setLoading(false);
    //   });
  };

  const Item = ({item}) => {
    return (
      (item.status === 'SUCCESS' || item.status === 'PROCESSING') && (
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
              {item.totalPrice}
            </Text>
            <Text
              textStyle="body10Regular"
              style={{
                color:
                  item.status === 'SUCCESS'
                    ? COLORS.success
                    : item.status === 'PROCESSING'
                    ? COLORS.primary
                    : COLORS.black,
              }}>
              {item.status === 'SUCCESS' ? 'COMPLETED' : item.status}
            </Text>
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
