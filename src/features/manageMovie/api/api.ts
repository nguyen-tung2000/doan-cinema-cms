import {
  MovieType,
  MovieRespon,
  MoviesResponse,
  MovieCMSResponse,
  CategoryRespon,
  DirectorRespon,
  ScreenRespon,
  getMovieRespon,
} from '../type';

import { axios } from '@/lib/axios';

export const getCategoryAll = (): Promise<CategoryRespon> => {
  return axios.get('/api/category/all');
};

export const createMovie = (data: MovieType): Promise<MovieRespon> => {
  return axios.post('/api/movie/add', data);
};

export const deleteMovie = (id: string): Promise<MovieRespon> => {
  return axios.delete(`/api/movie/delete/${id}`);
};

export const getDirectorAll = (): Promise<DirectorRespon> => {
  return axios.get('/api/director/all');
};

export const getMovieAll = (params?: string): Promise<MoviesResponse> => {
  return axios.get(`/api/getAllMovie?${params}`);
};

export const getScreenAll = (): Promise<ScreenRespon> => {
  return axios.get('/api/screen/all');
};

export const getMovie = (id: string): Promise<getMovieRespon> => {
  return axios.get(`/api/movie/${id}`);
};

export const updateMovie = (
  id: string | string[] | null,
  data: MovieType,
): Promise<MovieRespon> => {
  return axios.put(`/api/movie/update/${id}`, data);
};

export const getMovieAllCMS = (): Promise<MovieCMSResponse> => {
  return axios.get('/api/movie/get/movie-play-cms');
};
