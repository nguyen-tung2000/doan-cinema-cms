import { Select, FormControlProps, SelectProps } from "@chakra-ui/react";
import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { MdArrowDropDown } from "react-icons/md";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type Group = {
  title: string;
  items: Option[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options?: Group[];
  defaultValue?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
  onChanging?: any;
} & FormControlProps &
  SelectProps;

export const SelectField = (props: SelectFieldProps) => {
  const {
    label,
    options,
    error,
    defaultValue,
    registration,
    placeholder,
    size,
    variant,
    onChanging,
    ...selectProps
  } = props;

  return (
    <FieldWrapper label={label} error={error} {...selectProps}>
      <Select
        icon={<MdArrowDropDown />}
        placeholder={placeholder}
        size={size}
        variant={variant}
        {...registration}
        onChange={onChanging}
      >
        {defaultValue && <option value={defaultValue}>{defaultValue}</option>}
        {options &&
          options.map((option) => (
            <optgroup label={option.title} key={option.title}>
              {option.items.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </optgroup>
          ))}
      </Select>
    </FieldWrapper>
  );
};
