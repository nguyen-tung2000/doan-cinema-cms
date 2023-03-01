import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '.';

interface CheckBoxFieldProps extends FieldWrapperPassThroughProps, CheckboxProps {
  registration: Partial<UseFormRegisterReturn>;
  children?: React.ReactNode;
  name: string;
}

export const CheckBoxField: React.FC<CheckBoxFieldProps> = (props) => {
  const { label, error, name, registration, ...checkboxProps } = props;

  return (
    <FieldWrapper label={label} error={error}>
      <Checkbox {...registration} {...checkboxProps}>
        {name}
      </Checkbox>
    </FieldWrapper>
  );
};
