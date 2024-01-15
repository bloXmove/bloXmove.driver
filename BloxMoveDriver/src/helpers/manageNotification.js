import {useEffect} from 'react';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCurrent,
  setListJourney,
} from '@app/src/screens/HomeScreens/redux/actions';
import {journeyAPI} from '@app/src/screens/HomeScreens/utils';
import {setTransactionList} from '@app/src/screens/HomeScreens/redux/actions';
import {playSound} from './playSound';

const ManageNotification = () => {
  const dispatch = useDispatch();
  const newOrder = useSelector(state => state.journey.currentJourney);
  const listOrders = useSelector(state => state.journey.listOrders);
  const apiToken = useSelector(state => state.auth.token);
  const listTransactions = useSelector(state => state.payment.transactionList);

  const handNotification = notification => {
    console.log(notification);
    if (notification.data.data) {
      const notiType = notification.data.type;
      console.log(notiType);
      const data = JSON.parse(notification.data.data);
      const foundIndex = listOrders.findIndex(item => item.id === data.id);
      if (notiType === 'NEW_JOURNEY_REQUEST') {
        if (Platform.OS === 'ios') {
          playSound();
        }
        // List Journey
        if (foundIndex === -1 && listOrders.length < 3) {
          data.timeStamp = Date.now();
          const newData = [...listOrders, data];
          dispatch(setListJourney({data: newData}));
        }
        // End of List Journey
        // if (
        //   !newOrder.id ||
        //   (newOrder.id && newOrder.status !== 'WAIT' && newOrder.id !== data.id)
        // ) {
        //   dispatch(setCurrent({data: data}));
        // }
      }
      if (
        notiType === 'JOURNEY_REQUEST_CANCELLED' ||
        notiType === 'JOURNEY_REQUEST_ACCEPTED'
      ) {
        // List Journey
        if (foundIndex !== -1) {
          var newData = [...listOrders];
          newData.splice(foundIndex, 1);
          dispatch(setListJourney({data: newData}));
        }
        // End of List Journey
        // if (data.id === newOrder.id) {
        //   console.log('cancel from push notification');
        //   dispatch(setCurrent({data: ''}));
        // }
      }
      if (
        data.journeyId &&
        (notiType === 'JOURNEY_CANCELLED' ||
          notiType === 'JOURNEY_DRIVER_CANCELLED' ||
          notiType === 'JOURNEY_DRIVER_ENDED' ||
          notiType === 'JOURNEY_DRIVER_END_FAILED')
      ) {
        journeyAPI
          .journeyDetail(data.journeyId, apiToken)
          .then(response => {
            dispatch(
              setCurrent({
                data: response.data.data,
              }),
            );
          })
          .catch(error => {
            console.log(
              'Error to get the detail of the journey',
              error.response,
            );
          });
      } else {
        dispatch(journeyAPI.getCurrentJourney(apiToken));
      }
      // Manage Top Up and Withdraw
      if (notiType === 'WITHDRAW_COMPLETED' || notiType === 'WITHDRAW_FAILED') {
        const updatedData = listTransactions.map(item => {
          if (item.id === data.order_id) {
            return {
              ...item,
              status: data.status === 'ERROR' ? 'FAILURE' : data.status,
            };
          }
          return item;
        });
        dispatch(setTransactionList({data: updatedData, loading: false}));
      }
    }
  };

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    handNotification(remoteMessage);
  });
  useEffect(() => {
    // When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(notification => {
      // Handle the click event for the push notification
      handNotification(notification);
    });

    // When the application is running, but in the foreground.
    const unsubscribeFor = messaging().onMessage(async remoteMessage => {
      handNotification(remoteMessage);
    });

    return () => {
      // Unsubscribe the event listener when the component is unmounted
      unsubscribe();
      unsubscribeFor();
    };
  }, [newOrder, listOrders, listTransactions]);
};

export default ManageNotification;
