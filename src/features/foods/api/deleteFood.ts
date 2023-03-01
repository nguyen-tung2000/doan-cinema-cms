import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { ComBosResponse } from '../type';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export const deleteFood = ({ foodId }: { foodId: string }) => {
  return axios.delete(`/food/delete/${foodId}`);
};

type UseDeleteFoodtOptions = {
  config?: MutationConfig<typeof deleteFood>;
};

export const useDeleteFood = ({ config }: UseDeleteFoodtOptions = {}) => {
  const toast = createStandaloneToast();

  return useMutation({
    onMutate: async (deleteFood) => {
      await queryClient.cancelQueries('foods');

      const previousFoods = queryClient.getQueryData<ComBosResponse>('foods');

      queryClient.setQueryData('foods', {
        ...previousFoods,
        combos: previousFoods?.combos.filter((food) => food._id !== deleteFood.foodId),
      });

      return { previousFoods };
    },
    onError: (_, __, context: any) => {
      if (context?.previousFoods) {
        queryClient.setQueryData('foods', context.previousFoods);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('foods');
      toast({
        title: 'Xoá sản phẩm thành công',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: deleteFood,
  });
};
