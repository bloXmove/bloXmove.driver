import api from './axios';

export function getAboutUs(token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.get('customer-service/about-us', {
    headers: headers,
  });
}

export function getServices(token, url) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.get('customer-service/help?' + url, {
    headers: headers,
  });
}

export function contactUs(token, data) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('customer-service/contact-us', data, {
    headers: headers,
  });
}
export function contactUsNonMember(token, data) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  return api.post('customer-service/nonmember-contact-us', data, {
    headers: headers,
  });
}
