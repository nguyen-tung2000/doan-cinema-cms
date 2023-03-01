import styled from '@emotion/styled';

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 500;
`;
export const Input = styled.input`
  border: 1px solid #e2e8f0;
  outline: none;
  border-radius: 6px;
  color: #1a202c;
  line-height: 24px;
  padding: 12px 16px;
  margin-top: 8px;
  background-color: ${({ error }: any) => error && '#fef1f2'};

  &:focus {
    border-color: ${({ error }: any) => !error && '#0d75ff'};
  }
  border-color: ${({ error }: any) => error && '#dd4a48'};
` as any;
export const Area = styled.textarea`
  border: 1px solid #e2e8f0;
  outline: none;
  border-radius: 6px;
  color: #1a202c;
  line-height: 24px;
  padding: 12px 16px;
  margin-top: 8px;
  height: 120px;
  background-color: ${({ error }: any) => error && '#fef1f2'};

  &:focus {
    border-color: ${({ error }: any) => !error && '#0d75ff'};
  }
  border-color: ${({ error }: any) => error && '#dd4a48'};
` as any;
export const FileUpload = styled.input`
  display: none;
`;
export const FileUploadLabel = styled.label`
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: center;
  margin: 8px 0;
  border-radius: 6px;
`;
export const Image = styled.div`
  width: 100%;
  height: 450px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`;
export const Iframe = styled.iframe`
  width: 100%;
  height: 450px;
  border-radius: 6px;
`;
export const Label = styled.h2`
  font-size: 13px;
`;
