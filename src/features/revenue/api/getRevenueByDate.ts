import { useQuery } from 'react-query';

import { RevenueResponse } from '@/features/revenue';
import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface RevenuDTO {
  cinemaId: string;
  date: string;
}

export const getRevenueByDate = ({ cinemaId, date }: RevenuDTO): Promise<RevenueResponse> => {
  return axios.get(`/cinema/get/thong-ke-doanh-thu-theo-ngay`, {
    params: {
      cinemaId,
      date,
    },
  });
};

type UseRevenueOptions = {
  config?: QueryConfig<typeof getRevenueByDate>;
  cinemaId: string;
  date: string;
};

export const useGetRevenueByDate = ({ config, cinemaId, date }: UseRevenueOptions) => {
  return useQuery({
    ...config,
    queryKey: ['revenueByDate', date],
    queryFn: () =>
      getRevenueByDate({
        cinemaId,
        date,
      }),
  });
};
