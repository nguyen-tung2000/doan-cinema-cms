import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { ComBosResponse } from '@/features/foods';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type CreateFoodDTO = {
  name: string;
  price: string;
  unit: string;
  image: string;
};

export const createFood = (data: CreateFoodDTO): Promise<ComBosResponse> => {
  return axios.post('/food/add', data);
};

type UseCreateFoodOptions = {
  config?: MutationConfig<typeof createFood>;
};

export const useCreateFood = ({ config }: UseCreateFoodOptions = {}) => {
  const toast = createStandaloneToast();
  return useMutation({
    onMutate: async (newFood) => {
      await queryClient.cancelQueries('foods');

      const previousCinemas = queryClient.getQueryData<ComBosResponse>('foods');

      queryClient.setQueryData('foods', {
        ...previousCinemas,
        combos: [...(previousCinemas?.combos || []), newFood],
      });

      return { previousCinemas };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCinemas) {
        queryClient.setQueryData('foods', context.previousCinemas);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('foods');
      toast({
        title: 'Thêm sản phẩm thành công',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: createFood,
  });
};
