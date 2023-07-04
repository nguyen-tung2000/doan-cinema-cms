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
  cinemaId: string;
  month: string;
  year: string;
};

export const useRevenueByMonthQuery = ({ config, cinemaId, month, year }: UseRevenueOptions) => {
  return useQuery({
    ...config,
    queryKey: ['revenueByMonth', cinemaId, month, year],
    queryFn: () =>
      getRevenueByMonth({
        month,
        year,
      }),
  });
};
