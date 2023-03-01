import styled from '@emotion/styled';

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0 26px;
`;
export const ListPage = styled.div``;
export const Page = styled.span`
  font-weight: 600;
  &:first-of-type {
    color: red;
  }
`;
export const ListBtn = styled.div`
  cursor: pointer;
  display: flex;
`;

export const PaginationButton = styled.div`
  cursor: ${({ disabled }: any) => (disabled ? 'not-allowed' : 'pointer')};
  padding: 16px;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
  background-color: ${({ disabled }: any) => (disabled ? '#f9f9f9' : '#fff')};
  svg {
    width: 10px;
    height: 10px;
    fill: ${({ disabled }: any) => disabled && '#ccc'};
  }
`;
export const PaginationPrev = styled(PaginationButton)`
  border-right: 1px solid #f2f2f2;
` as any;
export const PaginationNext = styled(PaginationButton)`` as any;
