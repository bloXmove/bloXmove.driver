import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Input} from './Input';
import {InputSelectProps} from './types';

export const InputSelect: React.FC<InputSelectProps> = React.forwardRef(({
  inputProps,
  onPress,
  ...props
  },
  ref,
) => {
  return (
    <RNPickerSelect placeholder={{}} ref={ref} onOpen={onPress} {...props}>
      <Input
        inputType="select"
        rightIconName="down"
        {...inputProps}
        value={
          props.items.find(el => el.value === inputProps.value)?.label ?? ''
        }
      />
    </RNPickerSelect>
  );
});
