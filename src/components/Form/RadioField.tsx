import { FormControlProps, Radio, RadioGroup, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from ".";
interface RadioFieldProps extends FieldWrapperPassThroughProps, FormControlProps {
  options: string[];
  defaultValue?: string;
  registration: Partial<UseFormRegisterReturn>;
}

export const RadioField: React.FC<RadioFieldProps> = (props) => {
  const { options, label, registration, defaultValue, error } = props;

  return (
    <FieldWrapper label={label} error={error} fieldset={true}>
      <RadioGroup defaultValue={defaultValue}>
        <Wrap spacing="24px">
          {options.map((o, index) => (
            <WrapItem key={index}>
              <Radio value={o} {...registration}>
                {o}
              </Radio>
            </WrapItem>
          ))}
        </Wrap>
      </RadioGroup>
    </FieldWrapper>
  );
};
