import {required} from "./general";

export const phoneValidationRules = {
    required,
    maxLength: {
        value: 14,
        message: "Please enter a valid mobile number.",
    },
    minLength: {
        value: 14,
        message: "Please enter a valid mobile number.",
    },
};
