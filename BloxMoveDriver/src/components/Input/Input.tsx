import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS} from '../theme';
import {Text} from '../Text';
import {DateTimePicker, DateTimePickerMode} from './components/Picker';
import {
  getRightIconNameFromInputType,
  isDateTimeInput,
} from './services/constants';
import {InputProps} from './types';
import Moment from 'moment';

function PasswordIcon({
  onPress,
  isPasswordVisible,
}: {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  isPasswordVisible: boolean;
}) {
  return (
    <View />
    // <Icon
    //     suppressHighlighting
    //     name={isPasswordVisible ? "eye-line" : "eye-close-line"}
    //     size={ICON_SIZE}
    //     onPress={onPress}
    // />
  );
}

const ICON_SIZE = 20;

export const Input: React.FC<InputProps> = forwardRef(
  (
    {
      inputType = 'text',
      size = 'large',
      value,
      label,
      error,
      placeholder,
      hint,
      disabled = false,
      editable = true,
      rightIconName,
      rightComponent,
      leftComponent,
      customShowPasswordComponent,
      customHidePasswordComponent,
      defaultValue,
      isPassword,
      minimumDate,
      maximumDate,
      onChangeText = () => {},
      onFocus = () => {},
      onBlur = () => {},
      containerStyles = {},
      inputStyles = {},
      labelStyles = {},
      customLabelStyles = {},
      viewContainerStyle,
      errorTextStyle = {},
      pickerProps,
      showError = true,
      automationId = null,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSmallLabel, setIsSmallLabel] = useState(!!value || !!defaultValue);
    const [labelColor, setLabelColor] = useState(
      disabled ? COLORS.body : isSmallLabel ? COLORS.body : COLORS.body,
    );
    const [borderColor, setBorderColor] = useState(COLORS.form);
    const dateTimeInput = isDateTimeInput(inputType);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const onChangeAction = (date: Date) => {
      onChangeText(date.toDateString());
      setLabelColor(COLORS.body);
      setIsSmallLabel(true);
      setDatePickerVisible(!isDatePickerVisible);
    };

    const changeLabelState = useCallback((bool: boolean) => {
      setIsSmallLabel(bool);
      setLabelColor(COLORS.body);
    }, []);

    const onFocusActions = (
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      onFocus(e);
      setIsFocused(true);
      setBorderColor(COLORS.primary);
      changeLabelState(true);
    };

    const onBlurActions = (
      e: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => {
      onBlur(e);
      setIsFocused(false);
      changeLabelState(!!value);
      setBorderColor(COLORS.form);
    };

    const togglePassword = () => {
      setShowPassword(prev => !prev);
    };

    useEffect(() => {
      changeLabelState(!!value);
    }, [value, changeLabelState]);

    const computedRightIconName =
      rightIconName || getRightIconNameFromInputType(inputType);
    const fontSize = size === 'large' ? 18 : 18;
    const inputHeight = size === 'large' ? 64 : 64;

    const onInputPress = dateTimeInput
      ? async () => {
        await Keyboard.dismiss();
        setDatePickerVisible(!isDatePickerVisible)
      }
      : undefined;

    return (
      <View style={viewContainerStyle}>
        {dateTimeInput && (
          <DateTimePicker
            onHide={e => onBlur(e as any)}
            mode={inputType as DateTimePickerMode}
            onChange={onChangeAction}
            setDatePickerVisible={setDatePickerVisible}
            isDatePickerVisible={isDatePickerVisible}
            value={value}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            ref={ref}
            {...pickerProps}
          />
        )}
        <FloatingLabelInput
          onPressOut={onInputPress}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          isFocused={isFocused}
          label={label}
          hint={hint || placeholder}
          hintTextColor={COLORS.body}
          editable={
            disabled
              ? false
              : dateTimeInput
              ? false
              : inputType === 'select'
              ? false
              : editable
          }
          isPassword={isPassword}
          togglePassword={showPassword}
          onChangeText={onChangeText}
          onFocus={onFocusActions}
          onBlur={onBlurActions}
          customShowPasswordComponent={
            customShowPasswordComponent || (
              <PasswordIcon
                isPasswordVisible={showPassword}
                onPress={togglePassword}
              />
            )
          }
          customHidePasswordComponent={
            customHidePasswordComponent || (
              <PasswordIcon
                isPasswordVisible={showPassword}
                onPress={togglePassword}
              />
            )
          }
          rightComponent={
            computedRightIconName ? (
              <Icon
                suppressHighlighting
                size={ICON_SIZE}
                name={computedRightIconName}
                style={styles.icon}
                color={COLORS.black}
                onPress={onInputPress}
              />
            ) : (
              rightComponent
            )
          }
          leftComponent={leftComponent}
          containerStyles={{
            ...styles.container,
            backgroundColor: disabled ? COLORS.disabled : COLORS.white,
            height: inputHeight,
            borderColor: error ? COLORS.error : borderColor,
            paddingHorizontal:
              inputType === 'phone' ? 0 : size === 'large' ? 15 : 13,
            ...containerStyles,
          }}
          inputStyles={{
            fontSize,
            color: disabled ? COLORS.body : COLORS.black,
            fontFamily: FONTS.regular,
            transform: [{translateY: label ? 8 : 0}],
            ...inputStyles,
          }}
          labelStyles={{
            fontFamily: FONTS.regular,
            textShadowColor: COLORS.white,
            // width and lineHeight are added to fix cutting off
            // the right and the bottom sides of the label
            width: '80%',
            lineHeight: fontSize * 1.35,
            ...labelStyles,
          }}
          customLabelStyles={{
            topFocused: -10,
            leftBlurred: Platform.OS === 'ios' ? -2 : 3,
            leftFocused: Platform.OS === 'ios' ? 0 : 3,
            colorBlurred: disabled ? COLORS.body : labelColor,
            colorFocused: disabled ? COLORS.body : labelColor,
            fontSizeBlurred: fontSize,
            ...customLabelStyles,
          }}
          selectionColor={COLORS.disabled}
          animationDuration={200}
          labelProps={{
            suppressHighlighting: true,
            onPressOut: onInputPress,
          }}
          {...props}
        />
        {showError && (
          <Text
            automationId="inputError"
            style={[
              styles.errorText,
              {
                color: COLORS.error,
                ...errorTextStyle,
              },
            ]}>
            {error || ' '}
          </Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 2,
  },
  lineHeight: {lineHeight: ICON_SIZE},
  errorText: {paddingTop: 3, paddingBottom: 6},
  icon: {marginTop: 16},
});
