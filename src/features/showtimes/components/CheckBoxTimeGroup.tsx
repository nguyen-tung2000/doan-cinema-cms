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
}

export const CheckBoxTimeGroup: React.FC<CheckBoxTimeGroupProps> = (props) => {
  const { label, options, error, defaultValue, registration, onCheck } = props;
  console.log(defaultValue);

  return (
    <FieldWrapper label={label} error={error} fieldset={true}>
      <CheckboxGroup colorScheme="cyan" defaultValue={defaultValue}>
        <SimpleGrid columns={[2, null, 3]} spacing="5px">
          {options.map((o) => (
            <Checkbox
              isChecked={true}
              value={o.value}
              {...registration}
              key={o.value}
              onChange={(e) => {
                onCheck(e);
              }}
            >
              {o.label}
            </Checkbox>
          ))}
        </SimpleGrid>
      </CheckboxGroup>
    </FieldWrapper>
  );
};
