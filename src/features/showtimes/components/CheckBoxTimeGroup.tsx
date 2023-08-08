import { Checkbox, CheckboxGroup, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../../../components/Form';

type Option = {
  label: React.ReactNode;
  value: string | number;
};
interface CheckBoxTimeGroupProps extends FieldWrapperPassThroughProps {
  defaultValue?: string[];
  registration: Partial<UseFormRegisterReturn>;
  options: Option[];
  onCheck: (e: any) => void;
  values: string[] | number[];
}

export const CheckBoxTimeGroup: React.FC<CheckBoxTimeGroupProps> = (props) => {
  const { label, options, error, defaultValue, registration, onCheck, values } = props;
  console.log(defaultValue);

  return (
    <FieldWrapper label={label} error={error} fieldset={true}>
      <CheckboxGroup colorScheme="cyan" defaultValue={defaultValue}>
        <SimpleGrid columns={[2, null, 3]} spacing="5px">
          {options.map((o) => (
            <Checkbox
              value={o.value}
              {...registration}
              key={o.value}
              onChange={(e) => {
                onCheck(e);
              }}
              checked={values.includes(o.value as never)}
            >
              {o.label}
            </Checkbox>
          ))}
        </SimpleGrid>
      </CheckboxGroup>
    </FieldWrapper>
  );
};
