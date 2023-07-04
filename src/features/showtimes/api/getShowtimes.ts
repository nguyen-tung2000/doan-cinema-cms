import { useQuery } from 'react-query';

import { ShowTimesListByDayRangeResponse } from '..';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface ShowTimesDTO {
  dateStart: string;
  dateEnd: string;
  cinemaId: string;
}

export const getShowTimes = (data: ShowTimesDTO): Promise<ShowTimesListByDayRangeResponse> => {
  return axios.post(`/showTime/get-list-showtime`, data);
};

type UseShowTimesOptions = {
  config?: QueryConfig<typeof getShowTimes>;
  data: ShowTimesDTO;
};

export const useShowTimes = ({ config, data }: UseShowTimesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['showTimes', data.dateStart, data.dateEnd],
    queryFn: () => getShowTimes(data),
  });
};
