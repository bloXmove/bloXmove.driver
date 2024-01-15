import {InputProps} from "../types";

interface ObjectWithStringKey {
    [key: string]: string;
}

type InputType = InputProps["inputType"];

// eslint-disable-next-line import/no-unused-modules
export const DATE_TIME_ICONS: ObjectWithStringKey = {
    date: "calendar-line",
    time: "time-line",
};

export const DATE_TIME_FORMAT: ObjectWithStringKey = {
    date: "MM/DD/YYYY",
    time: "hh:mm A",
};

type IsDateTimeInput = (inputType: InputType) => boolean;

export const isDateTimeInput: IsDateTimeInput = inputType =>
    inputType === "date" || inputType === "time";

export function getRightIconNameFromInputType(inputType: InputType = "text") {
    return isDateTimeInput(inputType) ? DATE_TIME_ICONS[inputType] : undefined;
}
