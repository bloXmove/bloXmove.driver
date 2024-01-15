import {setBLXM, setNGN, setRate, setUSDC} from '../../redux/actions';
import api from './axios';

// Transactions
export function getTransactions(token, url) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.get('query-service/transaction?' + url, {
    headers: headers,
  });
}
export function detailTransaction(token, id) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.get('payment/top-up/' + id, {
    headers: headers,
  });
}
// Get Exchange Rate
export function getRates(token) {
  return function async(dispatch) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return api
      .get('payment/exchange-rates', {
        headers: headers,
      })
      .then(response => {
        const rates = response.data.data;
        rates.map(item => {
          if (item.currency === 'ENGN') {
            dispatch(setNGN({data: item.rate}));
          }
          if (item.currency === 'USDC') {
            dispatch(setUSDC({data: item.rate}));
          }
          if (item.currency === 'BLXM') {
            dispatch(setBLXM({data: item.rate}));
          }
        });
        dispatch(
          setRate({
            data: rates,
            loading: false,
          }),
        );
      })
      .catch(error => {
        // dispatch(getUserFail({error: true}));
      });
  };
}
// Widthdraw
export function createWithdraw(data, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('payment/withdraw', data, {
    headers: headers,
  });
}

export function getWithdraw(id, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.get('payment/withdraw/' + id, {
    headers: headers,
  });
}

export function completeWithdraw(id, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post(
    'payment/withdraw/' + id + '/complete',
    {},
    {
      headers: headers,
    },
  );
}
