import { Flex, Spinner } from '@chakra-ui/react';
import { unwrapResult } from '@reduxjs/toolkit';
import qs from 'query-string';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import { getMovie } from '../..';
import { MovieItemType } from '../../type';
import { MovieEdit } from '../MovieEdit/MovieEdit';
import { DeleteMovie } from '../MovieSlice';

import * as S from './MovieItem.style';

import clock from '@/assets/icon/clock.svg';
import edit from '@/assets/icon/edit.svg';
import play from '@/assets/icon/play.svg';
import trash from '@/assets/icon/trash.svg';
import x from '@/assets/icon/x.svg';
import { Toast } from '@/utils/Toast';

interface MovieItemProps {
  setMovie: Dispatch<SetStateAction<boolean>>;
  movie: boolean;
}

export const MovieItem: React.FC<MovieItemProps> = ({ setMovie, movie }) => {
  const [openTrailer, setOpenTrailer] = useState(false);
  const [isMovie, setIsMovie] = useState(false);
  const [idMovie, setIdMovie] = useState<string>('');
  const [movieValue, setMovieValue] = useState<MovieItemType | undefined>();
  const [listMovie, setMovieList] = useState<MovieItemType[]>([]);
  const update = useSelector((state: any) => state.movie.list);
  const [screenValue, setScreenValue] = useState<string[]>([]);
  const [categoryValue, setCategoryValue] = useState<string[]>([]);
  const history = useHistory();
  const location = useLocation();
  const query = useMemo(() => qs.parse(location.search), [location.search]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (update) {
      setMovieList(update);
      const idScreen: string[] = [];
      const idCategory: string[] = [];
      for (const i in update) {
        for (const j in update[i].screens) {
          if (update[i].screens[j]) idScreen.push(update[i].screens[j].name);
        }
      }
      for (const i in update) {
        for (const j in update[i].categories) {
          if (update[i].categories[j]) idCategory.push(update[i].categories[j].name);
        }
      }
      setScreenValue(idScreen.filter((item, index) => idScreen.indexOf(item) === index));
      setCategoryValue(idCategory.filter((item, index) => idCategory.indexOf(item) === index));
    }
  }, [update, dispatch]);

  const handleDelete = (id: string) => {
    setIsMovie(true);
    setIdMovie(id);
  };

  const handleDeleteMovie = async (id: string) => {
    const data: any = await dispatch(DeleteMovie(id));
    type Respon = {
      success: boolean;
      message: string;
    };
    const res: Respon = unwrapResult(data);
    if (res.success === true) {
      Toast(res.message);
      setMovie(!movie);
    } else {
      Toast(res.message, 'error');
    }
  };

  const handleEdit = async (id: string) => {
    const params = {
      ...query,
      id: id,
    };
    history.push(`/app/managemovie?${qs.stringify(params)}`);
    await getMovie(id)
      .then((res) => setMovieValue(res.values))
      .catch(console.log);
  };

  const spinner = (
    <Flex justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );
  return (
    <>
      {listMovie.length !== 0
        ? listMovie.map((movie: MovieItemType) => (
            <S.MovieItem key={movie.id}>
              <S.MovieLeft>
                <img src={movie.image} alt="" />
                <S.MovieTrailer onClick={() => setOpenTrailer(true)}>
                  <img src={play} alt="" />
                </S.MovieTrailer>
              </S.MovieLeft>
              <S.MovieRight>
                <S.MovieTitle>{movie.name}</S.MovieTitle>
                <S.MovieTime>
                  <img src={clock} alt="" />
                  {movie.time}
                </S.MovieTime>
                <S.MovieListSpan>
                  <S.MovieSpan>Đạo diễn:</S.MovieSpan>
                  <S.MovieSpan>{movie.director_name}</S.MovieSpan>
                </S.MovieListSpan>
                <S.MovieListSpan>
                  {movie.categories.length > 0 && (
                    <>
                      <S.MovieSpan>Thể loại:</S.MovieSpan>
                      <S.MovieSpan>
                        {categoryValue.length > 0 && <span>{categoryValue.toString()}</span>}
                      </S.MovieSpan>
                    </>
                  )}
                </S.MovieListSpan>
                <S.MovieListSpan>
                  <S.MovieSpan>Diễn viên:</S.MovieSpan>
                  {movie?.casts.map((cast, index) => (
                    <S.MovieSpan key={index}>{cast.name}</S.MovieSpan>
                  ))}
                </S.MovieListSpan>
                {movie.age < 13 ? (
                  <></>
                ) : (
                  <S.MovieListSpan>
                    <S.MovieSpan>Độ tuổi:</S.MovieSpan>
                    <S.MovieSpan>
                      {movie.age >= 13 && movie.age < 16 && `C13`}
                      {movie.age >= 16 && movie.age < 18 && `C16`}
                      {movie.age >= 18 && `C18`}
                    </S.MovieSpan>
                  </S.MovieListSpan>
                )}
                <S.MovieListSpan>
                  {movie.screens.length > 0 && (
                    <>
                      <S.MovieSpan>Loại màn:</S.MovieSpan>
                      <S.MovieSpan>
                        {screenValue.length > 0 && <span>{screenValue.toString()}</span>}
                      </S.MovieSpan>
                    </>
                  )}
                </S.MovieListSpan>
                <S.MovieListSpan>
                  <S.MovieSpan>Nội dung:</S.MovieSpan>
                  <S.MovieSpan>{movie.description}</S.MovieSpan>
                </S.MovieListSpan>
                <S.MovieListBtn>
                  <S.MovieBtnEdit onClick={() => handleEdit(movie.id)}>
                    <img src={edit} alt="" />
                    Edit
                  </S.MovieBtnEdit>
                  <S.MovieBtnDelete onClick={() => handleDelete(movie.id)}>
                    <img src={trash} alt="" />
                    Delete
                  </S.MovieBtnDelete>
                </S.MovieListBtn>
              </S.MovieRight>
              {openTrailer && (
                <S.MovieVideoTrailer>
                  <S.MovieVideoDiv>
                    <S.MovieVideo src={movie.trailler} frameBorder="0" allowFullScreen />
                    <img src={x} alt="" onClick={() => setOpenTrailer(false)} role="button" />
                  </S.MovieVideoDiv>
                </S.MovieVideoTrailer>
              )}
              {isMovie && (
                <S.MovieDelete>
                  <S.MovieFormDelete>
                    <S.MovieFormTitle>
                      Gỡ bỏ Movie?
                      <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 22.88 22.88"
                        xmlSpace="preserve"
                        onClick={() => setIsMovie(false)}
                      >
                        <path
                          style={{ fill: '#000' }}
                          d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539
	l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539
	c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0
	c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"
                        />
                      </svg>
                    </S.MovieFormTitle>
                    <S.MovieFormContent>
                      Nếu bạn xóa bỏ Movie khỏi hệ thống sẽ:
                      <S.MovieFormUl>
                        <S.MovieFormLi>
                          Ngăn tất cả người dùng truy cập vào, bất kể họ giữ vai trò gì.
                        </S.MovieFormLi>
                        <S.MovieFormLi>Ẩn Movie khỏi kết quả tìm kiếm.</S.MovieFormLi>
                        <S.MovieFormLi>
                          Vô hiệu hóa khi người dùng truy cập vào Movie này.
                        </S.MovieFormLi>
                      </S.MovieFormUl>
                      <S.MovieFormListBtn>
                        <S.MovieFormBtn onClick={() => setIsMovie(false)}>Hủy</S.MovieFormBtn>
                        <S.MovieFormBtn
                          onClick={() => {
                            handleDeleteMovie(idMovie);
                            setIsMovie(false);
                          }}
                        >
                          Xóa, gỡ bỏ
                        </S.MovieFormBtn>
                      </S.MovieFormListBtn>
                    </S.MovieFormContent>
                  </S.MovieFormDelete>
                </S.MovieDelete>
              )}
            </S.MovieItem>
          ))
        : spinner}
      {movieValue && (
        <MovieEdit
          movieValue={movieValue}
          setMovieValue={setMovieValue}
          setMovie={setMovie}
          movie={movie}
        />
      )}
    </>
  );
};
