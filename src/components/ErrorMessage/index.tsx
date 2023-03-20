import * as S from "./index.style";

interface ErrorMessageProps {
  errors: any;
  name: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, name }) => {
  const error = errors[name];
  return <S.ErrorMessage>{error && error.message}</S.ErrorMessage>;
};
