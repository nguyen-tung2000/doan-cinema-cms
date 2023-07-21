import { Flex, Spinner } from '@chakra-ui/react';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import qs from 'query-string';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { CategoryItem, MovieType, castType, filterProps, producerType } from '../../type';
import { MoviePagination } from '../MoviePagination/MoviePagination';
import { getMovieList } from '../MovieSlice';

import * as S from './MovieResult.style';

import search from '@/assets/icon/search.svg';
import x2 from '@/assets/icon/x2.svg';
import { ErrorMessage, SingleSelect } from '@/components';
import { InputField, Form, SelectField } from '@/components/Form2';
import MultiSelectMenu from '@/components/Form2/SelectMultipleField/SelectMultipleField';
import {
  MovieItem,
  getCategoryAll,
  getDirectorAll,
  getScreenAll,
  createMovie,
  directorType,
  screenType,
  getCastAll,
  getProducerAll,
} from '@/features/manageMovie';
import { storage } from '@/lib/firebase';
import { rules } from '@/utils/rules';
import { Toast } from '@/utils/Toast';

export const MovieResult = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(false);
  const [filters, setFilters] = useState<filterProps>({
    page: 1,
  });
  const location = useLocation();
  const dispatch = useDispatch();
  const query = useMemo(() => qs.parse(location.search), [location.search]);
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [directorList, setDirectorList] = useState<directorType[]>([]);
  const [screenList, setScreenList] = useState<screenType[]>([]);
  const [castList, setCastList] = useState<castType[]>([]);
  const [producerList, setProducerList] = useState<producerType[]>([]);
  const update = useSelector(
    (state: {
      movie: {
        isLoading: boolean;
      };
    }) => state.movie.isLoading,
  );
  const {
    control,
    getValues,
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const _filter = {
      page: Number(query.page) || 1,
    };
    setFilters(_filter);
    const params = {
      page: _filter.page,
    };
    const _getMovieList = async () => {
      await dispatch(getMovieList(params.page));
    };
    _getMovieList();
  }, [movie, query.page, query.limit, dispatch]);

  useEffect(() => {
    if (update) {
      setIsLoading(false);
    }
  }, [update]);

  const handleValue = async (data: MovieType) => {
    const body = {
      name: data.name,
      time: Number(data.time),
      image: data.image,
      trailler: data.trailler,
      description: data.description,
      director_id: data.director_id,
      producer_id: data.producer_id,
      casts: data.casts,
      age: Number(data.age),
      price: data.price,
      screens: data.screens,
      categories: data.categories,
      movie_start: data.movie_start,
      movie_end: data.movie_end,
    };
    try {
      const res = await createMovie(body);
      if (res.success === false) {
        if (res.errors.name) {
          Toast(res.errors.name, 'error');
        }
        if (res.errors.movie_start) {
          Toast(res.errors.movie_start, 'error');
        }
        if (res.errors.movie_end) {
          Toast(res.errors.movie_end, 'error');
        }
      } else {
        Toast(res.message);
        setMovie(!movie);
        setOpenAdd(false);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoImage = async (e: any, setValue: Dispatch<SetStateAction<string>>) => {
    if (e.target.files[0] && e.target.files[0].type.includes('image')) {
      const fileName = e.target.files[0];
      const storageRef = ref(storage, `images/${fileName.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      await uploadBytes(storageRef, fileName);
      getDownloadURL(uploadTask.snapshot.ref).then((url: string) => setValue(url));
    } else if (e.target.files[0] && e.target.files[0].type.includes('video')) {
      const fileName = e.target.files[0];
      const storageRef = ref(storage, `videos/${fileName.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileName);
      await uploadBytes(storageRef, fileName);
      getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
        console.log(url);
        setValue(url);
      });
    }
  };

  const handleAdd = async () => {
    setOpenAdd(true);
    getCategoryAll()
      .then((res) => setCategoryList(res.values))
      .catch(console.log);
    getDirectorAll()
      .then((res) => setDirectorList(res.values))
      .catch(console.log);
    getScreenAll()
      .then((res) => setScreenList(res.values))
      .catch(console.log);
    getCastAll()
      .then((res) => setCastList(res.values))
      .catch(console.log);
    getProducerAll()
      .then((res) => setProducerList(res.values))
      .catch(console.log);
  };

  const spinner = (
    <Flex justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );

  return (
    <>
      <S.MovieResult>
        <S.MovieSearch>
          <S.MovieSearchBtn>
            <img src={search} alt="" />
          </S.MovieSearchBtn>
          <S.MovieSearchInput placeholder="Search" />
        </S.MovieSearch>
        <S.MovieAdd onClick={handleAdd}>
          <svg
            height="448pt"
            viewBox="0 0 448 448"
            width="448pt"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
          </svg>
          Add Movie
        </S.MovieAdd>
        {openAdd && categoryList && directorList && screenList && (
          <Form submit={handleSubmit(handleValue)}>
            <S.Div>
              <S.MovieFormTitle>
                Add Movie
                <img src={x2} alt="" onClick={() => setOpenAdd(false)} role="button" />
              </S.MovieFormTitle>
              <S.MovieForm>
                <S.MovieFormController>
                  <Controller
                    name="name"
                    rules={rules.name}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="name"
                        title="Tên Film"
                        change={field.onChange}
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="name" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="time"
                    rules={rules.time}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="time"
                        title="Thời lượng"
                        change={field.onChange}
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="time" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="director_id"
                    rules={rules.daodien}
                    control={control}
                    render={({ field }) => (
                      <SelectField
                        List={directorList}
                        change={field.onChange}
                        title="Đạo diễn"
                        name="director_id"
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="director_id" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="producer_id"
                    rules={rules.producer}
                    control={control}
                    render={({ field }) => (
                      <SelectField
                        List={producerList}
                        change={field.onChange}
                        title="Nhà sản xuất"
                        name="producer_id"
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="director_id" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="casts"
                    rules={rules.dienvien}
                    control={control}
                    render={({ field }) => (
                      <MultiSelectMenu
                        options={castList}
                        onChange={field.onChange}
                        name="Diễn viên"
                      />
                    )}
                  />
                  <ErrorMessage name="categories" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="age"
                    rules={rules.age}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="age"
                        title="Độ tuổi"
                        change={field.onChange}
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="age" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="categories"
                    rules={rules.theloai}
                    control={control}
                    render={({ field }) => (
                      <MultiSelectMenu
                        options={categoryList}
                        onChange={field.onChange}
                        name="Thể loại"
                      />
                    )}
                  />
                  <ErrorMessage name="categories" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="screens"
                    rules={rules.loaiman}
                    control={control}
                    render={({ field }) => (
                      <MultiSelectMenu
                        options={screenList}
                        onChange={field.onChange}
                        name="Loại màn hình"
                      />
                    )}
                  />
                  <ErrorMessage name="screens" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="price"
                    rules={rules.giave}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="price"
                        title="Giá vé"
                        change={field.onChange}
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="price" errors={errors} />
                </S.MovieFormController>
                <S.MovieFormController>
                  <Controller
                    name="description"
                    rules={rules.content}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="description"
                        title="Nội dung"
                        textarea
                        change={field.onChange}
                        error={errors}
                      />
                    )}
                  />
                  <ErrorMessage name="description" errors={errors} />
                </S.MovieFormController>
              </S.MovieForm>
              <S.MovieForm>
                <S.MovieFormController2>
                  <SingleSelect registration={register('movie_start')} label="Ngày bắt đầu" />
                </S.MovieFormController2>
                <S.MovieFormController2>
                  <SingleSelect registration={register('movie_end')} label="Ngày kết thúc" />
                </S.MovieFormController2>
              </S.MovieForm>
              <S.MovieForm>
                <S.MovieFormController2>
                  <Controller
                    name="image"
                    rules={rules.image}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        url={getValues('image')}
                        name="image"
                        error={errors}
                        type="file"
                        title="Image URL"
                        change={(value) => handleVideoImage(value, field.onChange)}
                      />
                    )}
                  />
                  <ErrorMessage name="image" errors={errors} />
                </S.MovieFormController2>
                <S.MovieFormController2>
                  <Controller
                    name="trailler"
                    rules={rules.trailer}
                    control={control}
                    render={({ field }) => (
                      <InputField
                        url={getValues('trailler')}
                        name="trailler"
                        error={errors}
                        type="file"
                        title="Trailer URL"
                        change={(value) => handleVideoImage(value, field.onChange)}
                      />
                    )}
                  />
                  <ErrorMessage name="trailler" errors={errors} />
                </S.MovieFormController2>
              </S.MovieForm>
            </S.Div>
            <S.Div>
              <S.MovieFormListBtn>
                <S.MovieFormBtn
                  type="button"
                  onClick={() => {
                    setOpenAdd(false);
                  }}
                >
                  Cancel
                </S.MovieFormBtn>
                <S.MovieFormBtn>Create</S.MovieFormBtn>
              </S.MovieFormListBtn>
            </S.Div>
          </Form>
        )}
      </S.MovieResult>
      <S.Movie>
        <S.MovieListTitle>
          <S.MovieTitle>List Movie</S.MovieTitle>
          <MoviePagination filters={filters} setIsLoading={setIsLoading} />
        </S.MovieListTitle>
        <S.MovieList>
          {isLoading ? spinner : <MovieItem setMovie={setMovie} movie={movie} />}
        </S.MovieList>
      </S.Movie>
    </>
  );
};
