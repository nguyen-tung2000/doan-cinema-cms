import { useQuery } from 'react-query';

import { ShowTimesListByDateResponse } from '..';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface ShowTimesDTO {
  date: string;
  cinema_id: number;
}

export const getShowTimesByDate = ({
  date,
  cinema_id,
}: ShowTimesDTO): Promise<ShowTimesListByDateResponse> => {
  return axios.get(`/showTime/get-list-showtime-by-date`, {
    params: {
      date,
      cinema_id,
    },
  });
};

type UseShowTimesOptions = {
  config?: QueryConfig<typeof getShowTimesByDate>;
  data: ShowTimesDTO;
};

export const useShowTimesByDate = ({ config, data }: UseShowTimesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['showTimes', data],
    queryFn: () => getShowTimesByDate({ ...data }),
  });
};
