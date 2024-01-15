import {setCurrent} from '../../redux/actions';
import api from './axios';

// Get Current Journey
export function getCurrentJourney(token) {
  return function async(dispatch) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    return api
      .get('journey/current', {
        headers: headers,
      })
      .then(response => {
        dispatch(
          setCurrent({
            data: response.data.data,
            loading: false,
          }),
        );
      })
      .catch(error => {
        // dispatch(getUserFail({error: true}));
      });
  };
}

export function getJourney(token, url) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.get('journey?' + url, {headers: headers});
}

export function journeySearch(data, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('journey-request/search', data, {headers: headers});
}
// Detail of Journey after they pay
export function journeyDetail(id, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.get('journey/' + id, {headers: headers});
}
// Accept Journey Request
export function journeyRequestAccept(id, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('journey-request/' + id + '/accept', {}, {headers: headers});
}
// Decline a journey request
export function journeyRequestDecline(id, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('journey-request/' + id + '/decline', {}, {headers: headers});
}
// Accept Journey
export function journeyAccept(id, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('journey/' + id + '/accept', {}, {headers: headers});
}
// Driver Arrives
export function driverArrival(id, data, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('journey/' + id + '/driver-arrived', data, {
    headers: headers,
  });
}
// Accept Journey
export function journeyStart(id, data, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('journey/' + id + '/driver-start', data, {headers: headers});
}
// Cancel Journey
export function journeyCancel(id, data, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('journey/' + id + '/driver-cancel', data, {
    headers: headers,
  });
}
// End Journey
export function journeyEnd(id, data, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('journey/' + id + '/driver-end', data, {headers: headers});
}

// Review Journey
export function journeyReview(id, data, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('journey/' + id + '/review', data, {headers: headers});
}
