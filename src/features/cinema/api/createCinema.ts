import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { CinemaRespone } from '../type';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type CreateCommentDTO = {
  name: string;
  address: {
    city: string;
    district: string;
    ward: string;
    street: string;
  };
};

export const createCinema = (data: CreateCommentDTO): Promise<CinemaRespone> => {
  return axios.post('api/cinema/createCinema', data);
};

type UseCreateCinematOptions = {
  config?: MutationConfig<typeof createCinema>;
};

export const useCreateCinema = ({ config }: UseCreateCinematOptions = {}) => {
  const toast = createStandaloneToast();
  return useMutation({
    onMutate: async (newCinema) => {
      await queryClient.cancelQueries('cinemas');

      const previousCinemas = queryClient.getQueryData<CinemaRespone>('cinemas');

      queryClient.setQueryData('cinemas', {
        ...previousCinemas,
        values: { cinemas: [...(previousCinemas?.values || []), newCinema] },
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
        title: 'Created Cinema',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: createCinema,
  });
};
