export const CITY_NAME_VALIDATION =
    /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
export const NAME_REGEX = /^[-\sa-zA-Z]+$/;
export const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// eslint-disable-next-line import/no-unused-modules
export const CITY_REGEX =
    /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
export const UPPER_LOWER_CASE_REGEX = /(?=.*[a-z])(?=.*[A-Z]).{1,}$/;
export const NUMBER_REGEX = /[0-9]+/;
export const SYMBOL_REGEX = /[\W]+/;
export const INTEGER_REGEX = /^[0-9]*$/;
export const LICENCE_REGEX = /^[A-Z0-9_]*[A-Z0-9][A-Z0-9_]*$/;
