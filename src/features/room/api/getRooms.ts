import { useQuery } from 'react-query';

import { RoomRespone } from '../type';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getRooms = (): Promise<RoomRespone> => {
  return axios.get(`/room/all`);
};

type UseRoomsOptions = {
  config?: QueryConfig<typeof getRooms>;
};

export const useRooms = ({ config }: UseRoomsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['rooms'],
    queryFn: () => getRooms(),
  });
};
