import { useQuery } from 'react-query';

import { RoomByTRespone } from '../type';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getRoomsByMovie = ({ idMovie }: { idMovie: string }): Promise<RoomByTRespone> => {
  return axios.get(`/room/get-by-movie/${idMovie}`);
};

type UseRoomsByMovieOptions = {
  config?: QueryConfig<typeof getRoomsByMovie>;
  idMovie: string;
};

export const useRoomsByMovie = ({ config, idMovie }: UseRoomsByMovieOptions) => {
  return useQuery({
    ...config,
    queryKey: ['roomsByMovie', idMovie],
    queryFn: () => getRoomsByMovie({ idMovie }),
  });
};
