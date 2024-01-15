import {INTEGER_REGEX} from './regexps';

export const validateInteger = (value) => {
    
    // Check if value matches the integer pattern
    if (!INTEGER_REGEX.test(value)) {
        return {
            value: INTEGER_REGEX,
            message: `Please enter integer value`,
        };
    }
  
    return undefined; // Return undefined if value is valid
};

