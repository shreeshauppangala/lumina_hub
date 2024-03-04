'use client';

import { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { InputLabelComponent, TextFieldComponent } from './styles';

const InputField = forwardRef((props: TextFieldProps, ref) => {
  const { label, error, required } = props;
  return (
    <TextFieldComponent>
      {label && (
        <InputLabelComponent
          sx={(theme) => ({
            color: error
              ? theme.palette.error.main
              : theme.palette.common.black,
          })}
          className='labelBody'
        >
          {label} {required && <span className='required'>*</span>}
        </InputLabelComponent>
      )}
      <TextField
        {...props}
        label=''
        fullWidth
        error={error}
        required={required}
        inputRef={ref}
      />
    </TextFieldComponent>
  );
});

export default InputField;
