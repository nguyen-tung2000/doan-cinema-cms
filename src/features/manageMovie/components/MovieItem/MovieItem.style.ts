import styled from "@emotion/styled";

export const MovieItem = styled.div`
  display: flex;
  gap: 0 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  height: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const MovieLeft = styled.div`
  position: relative;
  width: 20%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  @media (max-width: 1024px) {
    width: 40%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const MovieTrailer = styled.div`
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #fff;
  border-radius: 50%;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.7);
  transition: background-color 0.5s ease;

  img {
    width: 30px;
    height: 30px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.5s ease;
  }
`;
export const MovieRight = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const MovieTitle = styled.h2`
  font-size: 25px;
  font-weight: 700;
`;
export const MovieTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;
  img {
    width: 20px;
    height: 20px;
  }
`;
export const MovieListSpan = styled.div`
  display: inline-block;
`;
export const MovieSpan = styled.span`
  font-size: 15px;
  &:first-of-type {
    color: #000;
    font-weight: 500;
    margin-right: 5px;
  }
`;
export const MovieListBtn = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 0 10px;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0 10px;
  padding: 8px 16px;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;

  img {
    width: 18px;
    height: 18px;
  }

  &:hover {
    opacity: 1;
  }
`;

export const MovieBtnEdit = styled(Button)`
  opacity: 0.8;
  background-color: #0bc5ea;
`;
export const MovieBtnDelete = styled(Button)`
  opacity: 0.8;
  background-color: red;
`;
export const MovieVideoDiv = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const MovieVideoTrailer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);

  img {
    position: absolute;
    cursor: pointer;
    right: 25%;
    width: 25px;
    height: 25px;
    transform: translate(116px, -332px);
  }
`;

export const MovieVideo = styled.iframe`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1200px;
  height: 675px;
  transform: translate(-50%, -50%);
`;
export const MovieDelete = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const MovieFormDelete = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 600px;
  transform: translate(-50%, -50%);
  padding: 16px;
  border-radius: 10px;
  background-color: #fff;
`;
export const MovieFormTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 700;

  svg {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
`;
export const MovieFormContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-top: 16px;
`;
export const MovieFormUl = styled.ul`
  margin: 8px 0;
`;
export const MovieFormLi = styled.li`
  margin-left: 20px;
`;
export const MovieFormListBtn = styled.div`
  display: flex;
  gap: 0 10px;
  margin-left: auto;
`;
export const MovieFormBtn = styled.button`
  padding: 8px 16px;
  border-radius: 6px;

  &:first-of-type {
    background-color: #f2f2f2;
  }

  &:last-child {
    background-color: #1877f2;
    color: #fff;
    font-weight: 700;
  }
`;
