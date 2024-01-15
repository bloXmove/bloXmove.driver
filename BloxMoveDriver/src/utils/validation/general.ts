import {CITY_NAME_VALIDATION, NAME_REGEX, LICENCE_REGEX} from './regexps';

export const required = 'This field is required.';

export const getNamePattern = (
  nameType: 'First' | 'Last' | 'Full' = 'Full',
) => {
  let messageStart = 'Name';
  
  if (['First', 'Last'].includes(nameType)) {
    messageStart = `${nameType} name`;
  }

  return {
    value: NAME_REGEX,
    message: `${messageStart} has invalid characters. Please try again.`,
  };
};

export const getLicencePattern = () => {
  let messageStart = 'Licence';

  return {
    value: LICENCE_REGEX,
    message: `${messageStart} has invalid format. Please input only uppercase letters and numbers.`,
  };
};

export const cityNamePattern = {
  value: CITY_NAME_VALIDATION,
  message: 'Please enter a valid address.',
};

export const validateZipCode = (value: string) =>
  (!Number.isNaN(value) && value.length === 5) ||
  'Please enter valid ZIP Code.';
