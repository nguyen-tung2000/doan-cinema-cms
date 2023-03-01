import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { RoomRespone } from '../type';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export const deleteRoom = ({ roomId }: { roomId: string }) => {
  return axios.delete(`/room/delete/${roomId}`);
};

type UseDeleteRoomtOptions = {
  config?: MutationConfig<typeof deleteRoom>;
};

export const useDeleteRoom = ({ config }: UseDeleteRoomtOptions = {}) => {
  const toast = createStandaloneToast();

  return useMutation({
    onMutate: async (deleteRoom) => {
      await queryClient.cancelQueries('rooms');

      const previousRooms = queryClient.getQueryData<RoomRespone>('rooms');

      queryClient.setQueryData('rooms', {
        ...previousRooms,
        values: {
          rooms: previousRooms?.values.rooms.filter((room) => room._id !== deleteRoom.roomId),
        },
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
        title: 'Deleted Room',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: deleteRoom,
  });
};
