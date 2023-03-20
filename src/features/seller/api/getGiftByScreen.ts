import { useQuery } from "react-query";

import { GiftResponse } from "..";

import { axios } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";

interface GiftDTO {
  screenId: string;
}

export const getGiftByScreen = ({ screenId }: GiftDTO): Promise<GiftResponse> => {
  return axios.get(`/coupon/gift/get-all`, {
    params: { screenId },
  });
};

type UseGetGiftByScreenOptions = {
  config?: QueryConfig<typeof getGiftByScreen>;
  screenId: string;
};

export const useGetGiftByScreen = ({ config, screenId }: UseGetGiftByScreenOptions) => {
  return useQuery({
    ...config,
    queryKey: ["giftByScreen", screenId],
    queryFn: () => getGiftByScreen({ screenId }),
  });
};
