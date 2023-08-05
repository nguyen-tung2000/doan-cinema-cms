import { useQuery } from 'react-query';

import { RevenueResponse } from '@/features/revenue';
import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface RevenuDTO {
  month: string;
  year: string;
}

export const getRevenueByMonth = ({ month, year }: RevenuDTO): Promise<RevenueResponse> => {
  return axios.get(`/cinema/get/thong-ke-doanh-thu-theo-thang`, {
    params: {
      month,
      year,
    },
  });
};

export const getAllRevenueByQuarter = (): Promise<RevenueResponse> => {
  return axios.get(`/cinema/get/thong-ke-all-rap-theo-quy`);
};

type UseRevenueOptions = {
  config?: QueryConfig<typeof getRevenueByMonth>;
  cinema_id: number;
  month: string;
  year: string;
};

export const useRevenueByMonthQuery = ({ config, cinema_id, month, year }: UseRevenueOptions) => {
  return useQuery({
    ...config,
    queryKey: ['revenueByMonth', cinema_id, month, year],
    queryFn: () =>
      getRevenueByMonth({
        month,
        year,
      }),
  });
};
