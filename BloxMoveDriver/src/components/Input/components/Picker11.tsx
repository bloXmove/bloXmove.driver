import React from 'react';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {PickerProps} from '../types';

export type DateTimePickerMode = 'date' | 'time';

export const DateTimePicker: React.FC<PickerProps> = ({
  maximumDate,
  minimumDate,
  onChange,
  mode = 'time',
  locale,
  setDatePickerVisible,
  isDatePickerVisible,
  ...props
}) => {
  const handleConfirm = (date: Date) => {
    setDatePickerVisible(!isDatePickerVisible);
    console.log('set value');
    if (maximumDate && moment(maximumDate).isBefore(date)) {
      onChange(maximumDate);

      return;
    }

    onChange(date);
  };

  return (
    <DateTimePickerModal
      display="spinner"
      isVisible={isDatePickerVisible}
      mode={mode}   
      themeVariant="light"
      isDarkModeEnabled={false}
      onConfirm={handleConfirm}
      onCancel={() => setDatePickerVisible(false)}
      locale={locale}
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      {...props}
    />
  );
};
