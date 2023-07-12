import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { CinemaRespone } from '../type';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export const deleteCinema = ({ cinemaId }: { cinemaId: string }) => {
  return axios.delete(`/cinema/deleteCinema/${cinemaId}`);
};

type UseDeleteCinematOptions = {
  config?: MutationConfig<typeof deleteCinema>;
};

export const useDeleteCinema = ({ config }: UseDeleteCinematOptions = {}) => {
  const toast = createStandaloneToast();

  return useMutation({
    onMutate: async (deleteCinema) => {
      await queryClient.cancelQueries('cinemas');

      const previousCinemas = queryClient.getQueryData<CinemaRespone>('cinemas');

      queryClient.setQueryData('cinemas', {
        ...previousCinemas,
        values: {
          cinemas: previousCinemas?.values.filter((cinema) => cinema.id !== deleteCinema.cinemaId),
        },
      });

      return { previousCinemas };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCinemas) {
        queryClient.setQueryData('cinemas', context.previousCinemas);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('cinemas');
      toast({
        title: 'Deleted Cinema',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: deleteCinema,
  });
};
