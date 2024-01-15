import Geocoder from 'react-native-geocoding';

export const getAddressFromCoordinates = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressComponent = json.results[0].address_components[1];
        resolve(addressComponent);
      })
      .catch(error => {
        resolve('fail');
      });
  });
};
