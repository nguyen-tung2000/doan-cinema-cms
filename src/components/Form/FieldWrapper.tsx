import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import * as React from "react";
import { FieldError } from "react-hook-form";

interface FieldWrapperProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
  fieldset?: boolean;
}

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, "className" | "children">;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, children, className, fieldset, ...formProps } = props;
  if (fieldset) {
    <FormControl as="fieldset" className={className} isInvalid={!!error} {...formProps}>
      <FormLabel as="legend">{label}</FormLabel>
      {children}
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>;
  }
  return (
    <FormControl className={className} isInvalid={!!error} {...formProps}>
      <FormLabel style={{ fontSize: "13px" }}>{label}</FormLabel>
      {children}
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};
