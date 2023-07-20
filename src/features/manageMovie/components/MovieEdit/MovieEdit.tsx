import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import qs from 'query-string';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';

import {
  getCastAll,
  getCategoryAll,
  getDirectorAll,
  getProducerAll,
  getScreenAll,
  updateMovie,
} from '../..';
import {
  CategoryItem,
  MovieItemType,
  MovieType,
  castType,
  directorType,
  producerType,
  screenType,
} from '../../type';
import * as S from '../MovieResult/MovieResult.style';

import x2 from '@/assets/icon/x2.svg';
import { ErrorMessage, SingleSelect } from '@/components';
import { InputField, Form, SelectField } from '@/components/Form2';
import MultiSelectMenu from '@/components/Form2/SelectMultipleField/SelectMultipleField';
import { storage } from '@/lib/firebase';
import { rules } from '@/utils/rules';
import { Toast } from '@/utils/Toast';
interface MovieEditProps {
  movieValue: MovieItemType;
  setMovieValue: Dispatch<SetStateAction<MovieItemType | undefined>>;
  setMovie: Dispatch<SetStateAction<boolean>>;
  movie: boolean;
}

export const MovieEdit: React.FC<MovieEditProps> = ({
  movieValue,
  setMovieValue,
  setMovie,
  movie,
}) => {
  const [screenValue] = useState<number[]>(() => {
    const idScreens = [];
    for (const i in movieValue.screens) {
      idScreens.push(movieValue.screens[i].id);
    }
    return idScreens;
  });
  const [castValue] = useState<number[]>(() => {
    const idCasts = [];
    for (const i in movieValue.casts) {
      idCasts.push(movieValue.casts[i].id);
    }
    return idCasts;
  });
  const [categoryValue] = useState<number[]>(() => {
    const idCategory = [];
    for (const i in movieValue.categories) {
      idCategory.push(movieValue.categories[i].id);
    }
    return idCategory;
  });
  console.log('screenValue', screenValue);
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [directorList, setDirectorList] = useState<directorType[]>([]);
  const [screenList, setScreenList] = useState<screenType[]>([]);
  const [castList, setCastList] = useState<castType[]>([]);
  const [producerList, setProducerList] = useState<producerType[]>([]);
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: movieValue.name,
      time: Number(movieValue.time),
      categories: categoryValue,
      director_id: movieValue.director_id,
      producer_id: movieValue.producer_id,
      casts: castValue,
      description: movieValue.description,
      screens: screenValue,
      image: movieValue.image,
      trailler: movieValue.trailler,
      age: Number(movieValue.age),
      movie_start: movieValue.movie_start,
      movie_end: movieValue.movie_end,
      price: movieValue.price,
    },
  });
  const location = useLocation();
  const query = useMemo(() => qs.parse(location.search), [location.search]);
  const history = useHistory();
  const handleValue = async (data: MovieType) => {
    const body = {
      name: data.name,
      time: Number(data.time),
      image: data.image,
      trailler: data.trailler,
      description: data.description,
      director_id: data.director_id,
      casts: data.casts,
      age: data.age,
      producer_id: data.producer_id,
      price: data.price,
      screens: data.screens,
      categories: data.categories,
      movie_start: data.movie_start,
      movie_end: data.movie_end,
    };
    console.log('body', body);
    try {
      const res = await updateMovie(query.id, body);
      if (res.success === false) {
        if (res.errors.movie_start) {
          Toast(res.errors.movie_start, 'error');
        }
        if (res.errors.movie_end) {
          Toast(res.errors.movie_end, 'error');
        }
      } else {
        Toast(res.message);
        history.push(`/app/managemovie?${qs.stringify({ page: query.page, limit: query.limit })}`);
        setMovieValue(undefined);
        setMovie(!movie);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(movieValue);

  useEffect(() => {
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
  }, []);

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
      getDownloadURL(uploadTask.snapshot.ref).then((url: string) => setValue(url));
    }
  };

  return (
    <>
      {movieValue && screenList && categoryList && directorList && (
        <Form submit={handleSubmit(handleValue)}>
          <S.MovieFormTitle>
            Edit Movie
            <img src={x2} alt="asdsd" onClick={() => setMovieValue(undefined)} role="button" />
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
                    value={getValues('name')}
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
                    name="moveDuration"
                    title="Thời lượng"
                    error={errors}
                    change={field.onChange}
                    value={getValues('time')}
                  />
                )}
              />
              <ErrorMessage name="moveDuration" errors={errors} />
            </S.MovieFormController>
            <S.MovieFormController>
              <Controller
                name="director_id"
                rules={rules.daodien}
                control={control}
                render={({ field }) => (
                  <SelectField
                    List={directorList}
                    error={errors}
                    change={field.onChange}
                    title="Đạo diễn"
                    name="director_id"
                    value={getValues('director_id')}
                  />
                )}
              />
              <ErrorMessage name="directorId" errors={errors} />
            </S.MovieFormController>
            <S.MovieFormController>
              <Controller
                name="producer_id"
                rules={rules.daodien}
                control={control}
                render={({ field }) => (
                  <SelectField
                    List={producerList}
                    error={errors}
                    change={field.onChange}
                    title="Nhà sản xuất"
                    name="producer_id"
                    value={getValues('producer_id')}
                  />
                )}
              />
              <ErrorMessage name="directorId" errors={errors} />
            </S.MovieFormController>
            <S.MovieFormController>
              <Controller
                name="casts"
                rules={rules.loaiman}
                control={control}
                render={({ field }) => (
                  <MultiSelectMenu
                    defaultValue={getValues('casts')}
                    options={castList}
                    onChange={field.onChange}
                    name="Diễn viên"
                  />
                )}
              />
              <ErrorMessage name="loaiman" errors={errors} />
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
                    error={errors}
                    change={field.onChange}
                    value={getValues('age')}
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
                    defaultValue={getValues('categories')}
                    options={categoryList}
                    onChange={field.onChange}
                    name="Thể loại"
                  />
                )}
              />
              <ErrorMessage name="categoryId" errors={errors} />
            </S.MovieFormController>
            <S.MovieFormController>
              <Controller
                name="screens"
                rules={rules.loaiman}
                control={control}
                render={({ field }) => (
                  <MultiSelectMenu
                    defaultValue={getValues('screens')}
                    options={screenList}
                    onChange={field.onChange}
                    name="Loại màn hình"
                  />
                )}
              />
              <ErrorMessage name="loaiman" errors={errors} />
            </S.MovieFormController>
            <S.MovieFormController>
              <Controller
                name="price"
                rules={rules.age}
                control={control}
                render={({ field }) => (
                  <InputField
                    name="price"
                    title="Giá vé"
                    error={errors}
                    change={field.onChange}
                    value={getValues('price')}
                  />
                )}
              />
              <ErrorMessage name="age" errors={errors} />
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
                    error={errors}
                    textarea
                    change={field.onChange}
                    value={getValues('description')}
                  />
                )}
              />
              <ErrorMessage name="description" errors={errors} />
            </S.MovieFormController>
          </S.MovieForm>
          <S.MovieForm>
            <S.MovieFormController2>
              <SingleSelect
                registration={register('movie_start')}
                defaultValue={getValues('movie_start')}
                label="Ngày bắt đầu"
              />
            </S.MovieFormController2>
            <S.MovieFormController2>
              <SingleSelect
                registration={register('movie_end')}
                defaultValue={getValues('movie_end')}
                label="Ngày kết thúc"
              />
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
                    type="file"
                    error={errors}
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
                    name="trailer"
                    type="file"
                    error={errors}
                    title="Trailer URL"
                    change={(value) => handleVideoImage(value, field.onChange)}
                  />
                )}
              />
              <ErrorMessage name="trailer" errors={errors} />
            </S.MovieFormController2>
          </S.MovieForm>
          <S.MovieFormListBtn>
            <S.MovieFormBtn onClick={() => setMovieValue(undefined)} type="button">
              Cancel
            </S.MovieFormBtn>
            <S.MovieFormBtn>Update</S.MovieFormBtn>
          </S.MovieFormListBtn>
        </Form>
      )}
    </>
  );
};
