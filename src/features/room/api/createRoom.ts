import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { RoomRespone } from '../type';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type CreateRoomDTO = {
  name: string;
  rows: number;
  seats_per_row: number;
  vip_seat_start: number;
  vip_seat_end: number;
  number_seat_couple: number;
  couple_row: number;
  screen_id: string;
};

export const createRoom = (data: CreateRoomDTO): Promise<RoomRespone> => {
  console.log(data);
  return axios.post('/room/addRoom', data);
};

type UseCreateRoomOptions = {
  config?: MutationConfig<typeof createRoom>;
};

export const useCreateRoom = ({ config }: UseCreateRoomOptions = {}) => {
  const toast = createStandaloneToast();
  return useMutation({
    onMutate: async (newRoom) => {
      await queryClient.cancelQueries('rooms');

      const previousRooms = queryClient.getQueryData<RoomRespone>('rooms');

      queryClient.setQueryData('rooms', {
        ...previousRooms,
        values: { rooms: [...(previousRooms?.values || []), newRoom] },
      });

      return { previousRooms };
    },
    onError: (_, __, context: any) => {
      if (context?.previousRooms) {
        queryClient.setQueryData('rooms', context.previousRooms);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('rooms');
      toast({
        title: 'Created Room',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: createRoom,
  });
};
