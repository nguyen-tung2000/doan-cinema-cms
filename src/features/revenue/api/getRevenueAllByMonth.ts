import { useQuery } from 'react-query';

import { RevenueAllByMonthResponse } from '@/features/revenue';
import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface RevenuDTO {
  month: string;
  year: string;
}

export const getRevenueAllByMonth = ({
  month,
  year,
}: RevenuDTO): Promise<RevenueAllByMonthResponse> => {
  return axios.get(`/cinema/get/thong-ke-all-rap-theo-thang`, {
    params: {
      month,
      year,
    },
  });
};

type UseRevenueOptions = {
  config?: QueryConfig<typeof getRevenueAllByMonth>;
  month: string;
  year: string;
};

export const useRevenueAllByMonthQuery = ({ config, month, year }: UseRevenueOptions) => {
  return useQuery({
    ...config,
    queryKey: ['revenueByMonth', month, year],
    queryFn: () =>
      getRevenueAllByMonth({
        month,
        year,
      }),
  });
};
