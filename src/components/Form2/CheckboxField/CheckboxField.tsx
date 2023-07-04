import React, { ChangeEventHandler } from 'react';

import * as S from './CheckboxField.style';

interface CheckboxFieldProps {
  name: string;
  change: ChangeEventHandler<HTMLInputElement | undefined>;
  title: string;
  listCheckbox: {
    id: string;
    name: string;
  }[];
  value?: string[];
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  listCheckbox,
  change,
  title,
  value,
}) => {
  return (
    <S.CheckboxField>
      <S.Label>{title}</S.Label>
      {!value && (
        <S.List>
          {listCheckbox.map((item, index) => (
            <S.Checkbox key={index}>
              <input type="checkbox" name={name} value={item.id} onChange={change} />
              {item.name}
            </S.Checkbox>
          ))}
        </S.List>
      )}
      {value && (
        <S.List>
          {listCheckbox.map((item, index) => (
            <React.Fragment key={index}>
              {value.includes(item.id) && (
                <S.Checkbox>
                  <input type="checkbox" name={name} value={item.id} onChange={change} checked />
                  {item.name}
                </S.Checkbox>
              )}
              {!value.includes(item.id) && (
                <S.Checkbox>
                  <input type="checkbox" name={name} value={item.id} onChange={change} />
                  {item.name}
                </S.Checkbox>
              )}
            </React.Fragment>
          ))}
        </S.List>
      )}
    </S.CheckboxField>
  );
};
