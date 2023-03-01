import styled from '@emotion/styled';

export const FormModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
export const Form = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 24px;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  width: 1200px;
  height: 800px;
  overflow-y: scroll;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 1;

  @media (max-width: 1200px) {
    width: 100%;
  }

  @media (max-width: 414px) {
    height: 100%;
  }
`;
