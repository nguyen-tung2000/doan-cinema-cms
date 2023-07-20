import {
  MovieType,
  MovieRespon,
  MoviesResponse,
  MovieCMSResponse,
  CategoryRespon,
  DirectorRespon,
  ScreenRespon,
  getMovieRespon,
  CastRespon,
  producerRespon,
} from '../type';

import { axios } from '@/lib/axios';

export const getCategoryAll = (): Promise<CategoryRespon> => {
  return axios.get('/category/getAllCategories');
};

export const createMovie = (data: MovieType): Promise<MovieRespon> => {
  return axios.post('/movie/addMovie', data);
};

export const deleteMovie = (id: string): Promise<MovieRespon> => {
  return axios.delete(`/movie/delete/${id}`);
};

export const getDirectorAll = (): Promise<DirectorRespon> => {
  return axios.get('/director/getAllDirector');
};

export const getMovieAll = (params?: number): Promise<MoviesResponse> => {
  return axios.get(`/movie/getAllMovies/${params}`);
};

export const getScreenAll = (): Promise<ScreenRespon> => {
  return axios.get('/screen/allScreen');
};

export const getCastAll = (): Promise<CastRespon> => {
  return axios.get('/cast/getAllCast');
};

export const getProducerAll = (): Promise<producerRespon> => {
  return axios.get('/producer/getAllProducers');
};
export const getMovie = (id: string): Promise<getMovieRespon> => {
  return axios.get(`/movie/getMovieById?id=${id}`);
};

export const updateMovie = (
  id: string | string[] | null,
  data: MovieType,
): Promise<MovieRespon> => {
  return axios.put(`/movie/updateMovie/${id}`, data);
};

export const getMovieAllCMS = (): Promise<MovieCMSResponse> => {
  return axios.get('/movie/get/movie-play-cms');
};
