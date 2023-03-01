import { createStandaloneToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';

import { RevenueResponseByMovie } from '@/features/revenue';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

interface RevenuDTO {
  cinemaId: string;
  dateStart: string;
  dateEnd: string;
}

export const getRevenueByMovie = (data: RevenuDTO): Promise<RevenueResponseByMovie> => {
  return axios.post('/cinema/get/thong-ke-phim-theo-rap', data);
};

type UseRevenueOptions = {
  config?: MutationConfig<typeof getRevenueByMovie>;
};

export const useGetRevenueByMovie = ({ config }: UseRevenueOptions = {}) => {
  const toast = createStandaloneToast();

  return useMutation({
    onMutate: async (newRevenue) => {
      await queryClient.cancelQueries('revenueByMovie');

      const previousRevenue = queryClient.getQueryData<RevenueResponseByMovie>('revenueByMovie');

      queryClient.setQueryData('revenueByMovie', {
        ...previousRevenue,
        data: [...(previousRevenue?.data || []), newRevenue],
      });

      return { previousRevenue };
    },
    onError: (_, __, context: any) => {
      if (context?.previousRevenue) {
        queryClient.setQueryData('revenueByMovie', context.previousRevenue);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('revenueByMovie');
      toast({
        title: 'Lấy dữ liệu doanh thu thành công',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: getRevenueByMovie,
  });
};
