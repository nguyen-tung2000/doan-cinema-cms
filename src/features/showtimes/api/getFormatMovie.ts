import { useQuery } from "react-query";

import { FormatMovieResponse } from "..";

import { getMovieAll, getMovieAllCMS } from "@/features/manageMovie";
import { axios } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";

export const getFormatMovie = (): Promise<FormatMovieResponse> => {
  return axios.get(`/screenDetail/all`);
};

type UseFormatOptions = {
  config?: QueryConfig<typeof getFormatMovie>;
};

export const useFormatMovie = ({ config }: UseFormatOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["formatMovie"],
    queryFn: () => getFormatMovie(),
  });
};

type UseMoviesOptions = {
  config?: QueryConfig<typeof getMovieAll>;
};

type UseMoviesCMSOptions = {
  config?: QueryConfig<typeof getMovieAllCMS>;
};

export const useMovies = ({ config }: UseMoviesOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["movies"],
    queryFn: () => getMovieAll(),
  });
};

export const useMoviesCMS = ({ config }: UseMoviesCMSOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["moviesCMS"],
    queryFn: () => getMovieAllCMS(),
  });
};
