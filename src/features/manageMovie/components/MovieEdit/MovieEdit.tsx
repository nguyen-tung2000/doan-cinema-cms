import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import qs from 'query-string';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';

import { getCategoryAll, getDirectorAll, getScreenAll, updateMovie } from '../..';
import { CategoryItem, MovieItemType, MovieType, directorType, screenType } from '../../type';
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
  const [screenValue] = useState<string[]>(() => {
    const idScreens = [];
    for (const i in movieValue.screens) {
      idScreens.push(movieValue.screens[i]._id);
    }
    return idScreens;
  });
  const [categoryValue] = useState<string[]>(() => {
    const idCategory = [];
    for (const i in movieValue.categories) {
      idCategory.push(movieValue.categories[i]._id);
    }
    return idCategory;
  });
  console.log('screenValue', screenValue);
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [directorList, setDirectorList] = useState<directorType[]>([]);
  const [screenList, setScreenList] = useState<screenType[]>([]);
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: movieValue.name,
      moveDuration: Number(movieValue.moveDuration),
      categoryId: categoryValue,
      directorId: movieValue.director._id,
      cast: movieValue.cast,
      description: movieValue.description,
      screensId: screenValue,
      image: movieValue.image,
      trailer: movieValue.trailer,
      age: Number(movieValue.age),
      dateStart: movieValue.dateStart,
      dateEnd: movieValue.dateEnd,
    },
  });
  const location = useLocation();
  const query = useMemo(() => qs.parse(location.search), [location.search]);
  const history = useHistory();
  const handleValue = async (data: MovieType) => {
    const body = {
      name: data.name,
      moveDuration: Number(data.moveDuration),
      image: data.image,
      trailer: data.trailer,
      description: data.description,
      directorId: data.directorId,
      cast: data.cast,
      age: Number(data.age),
      screensId: data.screensId,
      categoryId: data.categoryId,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
    };
    console.log('body', body);
    try {
      const res = await updateMovie(query.id, body);
      if (res.success === false) {
        if (res.errors.dateStart) {
          Toast(res.errors.dateStart, 'error');
        }
        if (res.errors.dateEnd) {
          Toast(res.errors.dateEnd, 'error');
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

  useEffect(() => {
    getCategoryAll()
      .then((res) => setCategoryList(res.values.categories))
      .catch(console.log);
    getDirectorAll()
      .then((res) => setDirectorList(res.values.directors))
      .catch(console.log);
    getScreenAll()
      .then((res) => setScreenList(res.values.screens))
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
                name="moveDuration"
                rules={rules.time}
                control={control}
                render={({ field }) => (
                  <InputField
                    name="moveDuration"
                    title="Thời lượng"
                    error={errors}
                    change={field.onChange}
                    value={getValues('moveDuration')}
                  />
                )}
              />
              <ErrorMessage name="moveDuration" errors={errors} />
            </S.MovieFormController>
            <S.MovieFormController>
              <Controller
                name="directorId"
                rules={rules.daodien}
                control={control}
                render={({ field }) => (
                  <SelectField
                    List={directorList}
                    error={errors}
                    change={field.onChange}
                    title="Đạo diễn"
                    name="directorId"
                    value={getValues('directorId')}
                  />
                )}
              />
              <ErrorMessage name="directorId" errors={errors} />
            </S.MovieFormController>
            <S.MovieFormController>
              <Controller
                name="cast"
                rules={rules.dienvien}
                control={control}
                render={({ field }) => (
                  <InputField
                    name="cast"
                    error={errors}
                    title="Diễn viên"
                    change={field.onChange}
                    value={getValues('cast')}
                  />
                )}
              />
              <ErrorMessage name="cast" errors={errors} />
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
                name="categoryId"
                rules={rules.theloai}
                control={control}
                render={({ field }) => (
                  <MultiSelectMenu
                    defaultValue={getValues('categoryId')}
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
                name="screensId"
                rules={rules.loaiman}
                control={control}
                render={({ field }) => (
                  <MultiSelectMenu
                    defaultValue={getValues('screensId')}
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
                registration={register('dateStart')}
                defaultValue={getValues('dateStart')}
                label="Ngày bắt đầu"
              />
            </S.MovieFormController2>
            <S.MovieFormController2>
              <SingleSelect
                registration={register('dateEnd')}
                defaultValue={getValues('dateEnd')}
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
                name="trailer"
                rules={rules.trailer}
                control={control}
                render={({ field }) => (
                  <InputField
                    url={getValues('trailer')}
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
