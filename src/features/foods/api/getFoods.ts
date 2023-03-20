import { useQuery } from "react-query";

import { ComBosResponse } from "@/features/foods";
import { axios } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";

export const getFoods = (): Promise<ComBosResponse> => {
  return axios.get(`/food/get-all`);
};

type UseFoodsOptions = {
  config?: QueryConfig<typeof getFoods>;
};

export const useFoods = ({ config }: UseFoodsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["foods"],
    queryFn: () => getFoods(),
  });
};
