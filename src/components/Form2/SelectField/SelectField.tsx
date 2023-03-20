import React, { ChangeEventHandler } from "react";

import * as S from "./SelectField.style";
interface SelectFieldProps {
  name: string;
  title: string;
  List: {
    _id: string;
    name: string;
  }[];
  change: ChangeEventHandler<HTMLSelectElement | undefined>;
  value?: string;
  error: any;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  List,
  change,
  title,
  name,
  value,
  error,
}) => {
  return (
    <S.SelectField>
      <S.Label>{title}</S.Label>
      {value && (
        <S.Select name={name} onChange={change} value={value} error={error[name]}>
          {List.map((item) => (
            <S.Option key={item._id} value={item._id}>
              {item.name}
            </S.Option>
          ))}
        </S.Select>
      )}
      {!value && (
        <S.Select name={name} onChange={change} error={error[name]}>
          <S.Option value="" hidden>
            Mời bạn chọn...
          </S.Option>
          {List.map((item) => (
            <S.Option key={item._id} value={item._id}>
              {item.name}
            </S.Option>
          ))}
        </S.Select>
      )}
    </S.SelectField>
  );
};
