import {
  MovieType,
  MovieRespon,
  MoviesResponse,
  MovieCMSResponse,
  CategoryRespon,
  DirectorRespon,
  ScreenRespon,
  getMovieRespon,
} from "../type";

import { axios } from "@/lib/axios";

export const getCategoryAll = (): Promise<CategoryRespon> => {
  return axios.get("/category/all");
};

export const createMovie = (data: MovieType): Promise<MovieRespon> => {
  return axios.post("/movie/add", data);
};

export const deleteMovie = (id: string): Promise<MovieRespon> => {
  return axios.delete(`movie/delete/${id}`);
};

export const getDirectorAll = (): Promise<DirectorRespon> => {
  return axios.get("/director/all");
};

export const getMovieAll = (params?: string): Promise<MoviesResponse> => {
  return axios.get(`/movie/all?${params}`);
};

export const getScreenAll = (): Promise<ScreenRespon> => {
  return axios.get("/screen/all");
};

export const getMovie = (id: string): Promise<getMovieRespon> => {
  return axios.get(`/movie/${id}`);
};

export const updateMovie = (
  id: string | string[] | null,
  data: MovieType,
): Promise<MovieRespon> => {
  return axios.put(`/movie/update/${id}`, data);
};

export const getMovieAllCMS = (): Promise<MovieCMSResponse> => {
  return axios.get("/movie/get/movie-play-cms");
};
