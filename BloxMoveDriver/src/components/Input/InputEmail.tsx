import {emailValidationRules} from '../../utils/validation/email';
import React from 'react';
import {Controller, ControllerProps} from 'react-hook-form';
import {Input} from './Input';
import {InputProps} from './types';

export function InputEmail({
  controllerProps,
  inputProps = {},
}: {
  controllerProps: Partial<ControllerProps<any>>;
  inputProps?: Partial<InputProps>;
}) {
  return (
    <Controller
      name="email"
      rules={emailValidationRules}
      render={({field: {onChange, ...field}, fieldState: {error}}) => (
        <Input
          {...field}
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          label="Email address"
          placeholder="example@domain.com"
          keyboardType="email-address"
          error={error?.message}
          onChangeText={onChange}
          {...inputProps}
        />
      )}
      {...controllerProps}
    />
  );
}
