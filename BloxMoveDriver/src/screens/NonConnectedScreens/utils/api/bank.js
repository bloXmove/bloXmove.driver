import api from './axios';

export function getBank(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.get('passenger/bank-account', {headers: headers});
}
export function updateBank(token, data) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.put('passenger/bank-account', data, {headers: headers});
}

// Get Bank List
export function getBankList() {
  return api.get('payment/bank');
}
