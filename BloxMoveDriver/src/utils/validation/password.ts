import {NUMBER_REGEX, SYMBOL_REGEX, UPPER_LOWER_CASE_REGEX} from './regexps';
import {required} from './general';

export const passwordValidationRules = {
  required,
  minLength: {
    value: 8,
    message: 'Passwords must be longer than 8 characters.',
  },
};

export const validatePassword = (value: string) => {
  const isLowerAndUpperCase = UPPER_LOWER_CASE_REGEX.test(value);
  const isNumberOrSymbolIncluded =
    SYMBOL_REGEX.test(value) || NUMBER_REGEX.test(value);
  return isLowerAndUpperCase && isNumberOrSymbolIncluded;
};

export const createPasswordRules = {
  ...passwordValidationRules,
  validate: validatePassword,
};
