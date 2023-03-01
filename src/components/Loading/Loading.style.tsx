import { keyframes } from '@chakra-ui/system';
import styled from '@emotion/styled';

export const loading = keyframes`
  to {
    transform: rotate(1turn);
  }
`;
export const LoadingOverLay = styled.section`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;
export const Loading = styled.section`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding-top: 77px;
  color: red;

  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 4px solid #fff;
    border-left-color: #000;
    border-radius: 50%;
    animation: ${loading} 1s ease infinite;
  }
`;
