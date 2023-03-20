import styled from "@emotion/styled";

export const SelectField = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 500;
`;
export const Select = styled.select`
  border: 1px solid #e2e8f0;
  outline: none;
  border-radius: 6px;
  color: #1a202c;
  line-height: 24px;
  padding: 12px 16px;
  margin-top: 8px;
  background-color: ${({ error }: any) => error && "#fef1f2"};

  &:focus {
    border-color: ${({ error }: any) => !error && "#0d75ff"};
  }

  border-color: ${({ error }: any) => error && "#dd4a48"};
` as any;
export const Option = styled.option``;

export const Label = styled.h2`
  font-size: 13px;
`;
