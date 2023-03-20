import { createStandaloneToast } from "@chakra-ui/toast";
import { useMutation } from "react-query";

import { ComBosResponse } from "@/features/foods";
import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

export type UpdateFoodDTO = {
  data: { name: string; price: string; unit: string; image: string };
  foodId: string;
};

export const editFood = ({ data, foodId }: UpdateFoodDTO): Promise<ComBosResponse> => {
  return axios.put(`/food/update/${foodId}`, data);
};

type UseUpdateFoodOptions = {
  config?: MutationConfig<typeof editFood>;
};

export const useEditFood = ({ config }: UseUpdateFoodOptions = {}) => {
  const toast = createStandaloneToast();
  return useMutation({
    onMutate: async (updatingFood) => {
      await queryClient.cancelQueries(["foods", updatingFood.foodId]);

      const previousFood = queryClient.getQueryData<ComBosResponse>(["foods", updatingFood.foodId]);

      queryClient.setQueryData(["foods", updatingFood.foodId], {
        ...previousFood,
        combos: { ...updatingFood.data, _id: updatingFood.foodId },
      });

      return { previousFood };
    },
    onError: (_, __, context: any) => {
      if (context?.previousFood) {
        queryClient.setQueryData("foods", context.previousFood);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("foods");
      toast({
        title: "Sửa thành công",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    },
    ...config,
    mutationFn: editFood,
  });
};
