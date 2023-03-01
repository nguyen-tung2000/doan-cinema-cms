import styled from '@emotion/styled';

export const MovieResult = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;
export const MovieSearch = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 10px;
  border: 1px solid #ccc;
  padding: 4px;
  background-color: #fff;
  border-radius: 20px;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 300px;
  }
  @media (max-width: 414px) {
    max-width: 200px;
  }
  @media (max-width: 414px) {
    max-width: 150px;
  }
`;
export const MovieSearchInput = styled.input`
  width: 100%;
  padding: 4px 16px 4px 4px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  @media (max-width: 414px) {
    padding: 4px 0px 4px 4px;
  }
`;
export const MovieSearchBtn = styled.button`
  padding: 8px 0px 8px 8px;
  border-radius: 50%;
  img {
    width: 20px;
    height: 20px;
  }
`;
export const MovieAdd = styled.button`
  display: flex;
  align-items: center;
  gap: 0 10px;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  padding: 4px 24px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.5s ease;

  @media (max-width: 768px) {
    padding: 4px 10px;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: #fff;
    transition: all 0.5s ease;
  }

  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;

    svg {
      fill: #000;
      transition: all 0.5s ease;
    }

    transition: all 0.5s ease;
  }
`;

export const MovieFormTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 20px;

  img {
    cursor: pointer;
    width: 14px;
    height: 14px;
  }
`;
export const MovieFormListBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0 10px;
  margin-top: 20px;
`;
export const MovieFormBtn = styled.button`
  background-color: #edf2f7;
  border-radius: 6px;
  color: #1a202c;
  font-weight: 500;
  line-height: 19.2px;
  padding: 12px 16px;
  opacity: 0.8;

  &:last-child {
    color: #fff;
    background-color: #0bc5ea;
  }

  &:hover {
    opacity: 1;
  }
`;
export const MovieForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px 10px;

  &:nth-of-type(3) {
    margin: 10px 0;
  }
`;
export const MovieFormController = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: calc(100% / 5 - 10px);
  :last-child {
    width: calc(60% - 10px);
  }

  @media (max-width: 768px) {
    width: calc(100% / 4 - 10px);
    :nth-of-type(5) {
      width: calc(50% - 10px);
    }
    :nth-of-type(6),
    :nth-of-type(7) {
      width: calc(50% / 2 - 10px);
    }
    :last-child {
      width: 100%;
    }
  }

  @media (max-width: 414px) {
    width: calc(100% / 2 - 10px);
    :nth-of-type(6),
    :nth-of-type(7) {
      width: calc(100% / 2 - 10px);
    }
  }
`;
export const MovieFormController2 = styled.div`
  width: calc(50% - 10px);
  @media (max-width: 414px) {
    width: 100%;
  }
`;
export const Movie = styled.section`
  padding: 16px;
`;
export const MovieTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
`;
export const MovieList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  margin-top: 16px;
`;
export const MovieListItem = styled.div`
  display: flex;
`;
export const MovieTitleName = styled.h2`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding: 8px 0;
`;
export const Div = styled.div``;
export const MovieListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
