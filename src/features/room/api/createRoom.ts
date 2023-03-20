import { createStandaloneToast } from "@chakra-ui/toast";
import { useMutation } from "react-query";

import { RoomRespone } from "../type";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

export type CreateRoomDTO = {
  cinemaId: string;
  name: string;
  rowNumber: number;
  seatsInRow: number;
  screenId: string;
};

export const createRoom = (data: CreateRoomDTO): Promise<RoomRespone> => {
  return axios.post("/room/add", data);
};

type UseCreateRoomOptions = {
  config?: MutationConfig<typeof createRoom>;
};

export const useCreateRoom = ({ config }: UseCreateRoomOptions = {}) => {
  const toast = createStandaloneToast();
  return useMutation({
    onMutate: async (newRoom) => {
      await queryClient.cancelQueries("rooms");

      const previousRooms = queryClient.getQueryData<RoomRespone>("rooms");

      queryClient.setQueryData("rooms", {
        ...previousRooms,
        values: { rooms: [...(previousRooms?.values.rooms || []), newRoom] },
      });

      return { previousRooms };
    },
    onError: (_, __, context: any) => {
      if (context?.previousRooms) {
        queryClient.setQueryData("rooms", context.previousRooms);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("rooms");
      toast({
        title: "Created Room",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    },
    ...config,
    mutationFn: createRoom,
  });
};
