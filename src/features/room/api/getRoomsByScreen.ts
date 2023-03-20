import { useQuery } from "react-query";

import { RoomByTRespone } from "../type";

import { axios } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";

export const getRoomsByScreen = ({ idScreen }: { idScreen: string }): Promise<RoomByTRespone> => {
  return axios.get(`/room/get-room-by-screen/${idScreen}`);
};

type UseRoomsByScreenOptions = {
  config?: QueryConfig<typeof getRoomsByScreen>;
  idScreen: string;
};

export const useRoomsByScreen = ({ config, idScreen }: UseRoomsByScreenOptions) => {
  return useQuery({
    ...config,
    queryKey: ["roomsByScreen", idScreen],
    queryFn: () => getRoomsByScreen({ idScreen }),
  });
};
