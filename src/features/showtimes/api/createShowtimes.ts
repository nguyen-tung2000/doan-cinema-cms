import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { ShowTimesResponse, TimeStamp } from '@/features/showtimes';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type CreateShowTimesDTO = {
  data: {
    dateStart: string;
    dateEnd: string;
    movieId: string;
    cinemaId: string;
    showTimes: TimeStamp[];
  };
};

export const createShowTimes = ({ data }: CreateShowTimesDTO): Promise<ShowTimesResponse> => {
  return axios.post('/showTime/add', data);
};

type UseCreateShowTimeOptions = {
  config?: MutationConfig<typeof createShowTimes>;
};

export const useCreateShowTime = ({ config }: UseCreateShowTimeOptions = {}) => {
  const toast = createStandaloneToast();

  return useMutation({
    onMutate: async (newShowTimes) => {
      await queryClient.cancelQueries('showTimes');

      const previousShowTimes = queryClient.getQueryData<ShowTimesResponse>('showTimes');

      queryClient.setQueryData('showTimes', {
        ...previousShowTimes,
        showTimes: [...(previousShowTimes?.showTimes || []), newShowTimes],
      });

      return { previousShowTimes };
    },
    onError: (_, __, context: any) => {
      if (context?.previousShowTimes) {
        queryClient.setQueryData('showTimes', context.previousShowTimes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('showTimes');
      toast({
        title: 'Created ShowTimes',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: createShowTimes,
  });
};
