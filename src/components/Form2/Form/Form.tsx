import React from 'react';
import { SubmitHandler } from 'react-hook-form';

import * as S from './Form.style';

interface FormProps {
  submit: SubmitHandler<any>;
}

export const Form: React.FC<FormProps> = ({ submit, children }) => {
  return (
    <S.FormModal>
      <S.Form onSubmit={submit}>{children}</S.Form>
    </S.FormModal>
  );
};
