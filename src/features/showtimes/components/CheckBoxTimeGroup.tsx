import { Checkbox, CheckboxGroup, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../../../components/Form';

type Option = {
  label: React.ReactNode;
  value: string | number;
  disable: boolean;
};
interface CheckBoxTimeGroupProps extends FieldWrapperPassThroughProps {
  defaultValue?: string[];
  registration: Partial<UseFormRegisterReturn>;
  options: Option[];
  roomName: string;
  screenName: string;
  onCheck: ({
    id,
    roomName,
    screenName,
  }: {
    id: string;
    roomName: string;
    screenName: string;
  }) => void;
}

export const CheckBoxTimeGroup: React.FC<CheckBoxTimeGroupProps> = (props) => {
  const { label, options, error, defaultValue, roomName, screenName, registration, onCheck } =
    props;

  return (
    <FieldWrapper label={label} error={error} fieldset={true}>
      <CheckboxGroup colorScheme="cyan" defaultValue={defaultValue}>
        <SimpleGrid columns={[2, null, 3]} spacing="5px">
          {options.map((o) => (
            <Checkbox
              value={o.value}
              {...registration}
              key={o.value}
              isDisabled={o.disable}
              onChange={() => {
                onCheck({ id: o.value as string, roomName, screenName });
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
