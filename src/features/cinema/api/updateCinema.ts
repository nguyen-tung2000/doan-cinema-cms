import { createStandaloneToast } from "@chakra-ui/toast";
import { useMutation } from "react-query";

import { CinemaRespone } from "../type";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

export type UpdateCommentDTO = {
  data: {
    name: string;
    address: {
      city: string;
      district: string;
      ward: string;
      street: string;
    };
  };
  cinemaId: string;
};

export const updateCinema = ({ data, cinemaId }: UpdateCommentDTO): Promise<CinemaRespone> => {
  return axios.put(`/cinema/update/${cinemaId}`, { ...data });
};

type UseUpdateCinematOptions = {
  config?: MutationConfig<typeof updateCinema>;
};

export const useUpdateCinema = ({ config }: UseUpdateCinematOptions = {}) => {
  const toast = createStandaloneToast();

  return useMutation({
    onMutate: async (updateCinema) => {
      await queryClient.cancelQueries(["cinemas", updateCinema?.cinemaId]);

      const previousCinemas = queryClient.getQueryData<CinemaRespone>([
        "cinemas",
        updateCinema.cinemaId,
      ]);

      queryClient.setQueryData(["cinemas", updateCinema.cinemaId], {
        ...previousCinemas,
        values: { cinemas: { ...updateCinema.data, _id: updateCinema.cinemaId } },
      });

      return { previousCinemas };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCinemas) {
        queryClient.setQueryData("cinemas", context.previousCinemas);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("cinemas");
      toast({
        title: "Updated Cinema",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    },
    ...config,
    mutationFn: updateCinema,
  });
};
