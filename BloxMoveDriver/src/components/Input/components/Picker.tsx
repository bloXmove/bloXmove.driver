import React from 'react';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {PickerProps} from '../types';
import DatePicker from 'react-native-date-picker';

export type DateTimePickerMode = 'date' | 'time';

export const DateTimePicker: React.FC<PickerProps> = React.forwardRef(
  (
    {
      maximumDate,
      minimumDate,
      onChange,
      mode = 'time',
      locale,
      value,
      setDatePickerVisible,
      isDatePickerVisible,
      ...pickerProps
    },
    ref,
  ) => {
    const handleConfirm = (date: Date) => {
      setDatePickerVisible(!isDatePickerVisible);
      if (maximumDate && moment(maximumDate).isBefore(date)) {
        onChange(maximumDate);

        return;
      }

      onChange(date);
    };

    return (
      <DatePicker
        modal
        open={isDatePickerVisible}
        ref={ref}
        date={value === '' ? new Date() : new Date(value)}
        onConfirm={handleConfirm}
        onCancel={() => {
          setDatePickerVisible(false);
        }}
        minimumDate={minimumDate === '' ? undefined : minimumDate}
        maximumDate={maximumDate === '' ? undefined : maximumDate}
        mode={mode}
        theme="light"
        {...pickerProps}
      />
      // <DateTimePickerModal
      //   display="spinner"
      //   isVisible={isDatePickerVisible}
      //   mode={mode}
      //   themeVariant="light"
      //   isDarkModeEnabled={false}
      //   onConfirm={handleConfirm}
      //   onCancel={() => setDatePickerVisible(false)}
      //   locale={locale}
      //   maximumDate={maximumDate}
      //   minimumDate={minimumDate}
      //   {...props}
      // />
    );
  },
);
