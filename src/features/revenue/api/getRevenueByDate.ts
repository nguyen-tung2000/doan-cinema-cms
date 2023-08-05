import { useQuery } from 'react-query';

import { RevenueResponse } from '@/features/revenue';
import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface RevenuDTO {
  cinema_id: number;
  date: string;
}

export const getRevenueByDate = ({ cinema_id, date }: RevenuDTO): Promise<RevenueResponse> => {
  return axios.get(`/cinema/get/thong-ke-doanh-thu-theo-ngay`, {
    params: {
      cinema_id,
      date,
    },
  });
};

type UseRevenueOptions = {
  config?: QueryConfig<typeof getRevenueByDate>;
  cinema_id: number;
  date: string;
};

export const useGetRevenueByDate = ({ config, cinema_id, date }: UseRevenueOptions) => {
  return useQuery({
    ...config,
    queryKey: ['revenueByDate', date],
    queryFn: () =>
      getRevenueByDate({
        cinema_id,
        date,
      }),
  });
};
