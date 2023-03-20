import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps,
} from "@chakra-ui/number-input";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from ".";

interface InputNumberFieldProps extends NumberInputProps, FieldWrapperPassThroughProps {
  registration: Partial<UseFormRegisterReturn>;
}

export const InputNumberField: React.FC<InputNumberFieldProps> = (props) => {
  const { label, error, max, min, defaultValue, registration, ...numberField } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <NumberInput defaultValue={defaultValue} max={max} min={min} {...numberField}>
        <NumberInputField {...registration} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FieldWrapper>
  );
};
