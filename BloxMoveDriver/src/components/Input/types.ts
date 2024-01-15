import * as React from "react";
import {FieldError} from "react-hook-form";
import {TextStyle, ViewStyle} from "react-native";
import {FloatingLabelInput} from "react-native-floating-label-input";
import {DateTimePickerProps} from "react-native-modal-datetime-picker";
import {PickerSelectProps} from "react-native-picker-select";
import {DateTimePickerMode} from "./components/Picker";

// TODO: these types are wrong, not all DateTimePickerProps are passed to component
export interface PickerProps
    extends Omit<DateTimePickerProps, "onConfirm" | "onCancel"> {
    onChange: (date: Date) => void;
    mode?: DateTimePickerMode;
    setDatePickerVisible: (visible: boolean) => void;
    isDatePickerVisible: boolean;
    ref?: ref;
}

// eslint-disable-next-line import/no-unused-modules
export type InputSizeType = "medium" | "large";

export type InputProps = {
    inputType?: "text" | DateTimePickerMode | "select" | "phone";
    size?: InputSizeType;
    error?: FieldError | string;
    disabled?: boolean;
    rightIconName?: string;
    maximumDate?: Date;
    minimumDate?: Date;
    viewContainerStyle?: ViewStyle;
    errorTextStyle?: TextStyle;
    pickerProps?: Omit<
        PickerProps,
        "onChange" | "setDatePickerVisible" | "isDatePickerVisible"
    >;
    showError?: boolean;
    automationId?: string;
} & React.ComponentProps<typeof FloatingLabelInput>;

export interface InputSelectProps extends PickerSelectProps {
    inputProps: InputProps;
    onPress?: () => void;
    ref?: ref;
}
