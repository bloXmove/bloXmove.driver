import {EMAIL_REGEX} from './regexps';
import {required} from './general';

export const emailValidationRules = {
  required,
  pattern: {
    value: EMAIL_REGEX,
    message: 'Please enter a valid email address.',
  },
};
