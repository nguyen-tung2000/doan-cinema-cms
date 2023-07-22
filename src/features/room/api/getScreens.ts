import { useQuery } from 'react-query';

import { ScreenRespone } from './../type';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getScreens = (): Promise<ScreenRespone> => {
  return axios.get(`/screen/allScreen`);
};

type UseScreensOptions = {
  config?: QueryConfig<typeof getScreens>;
};

export const useScreens = ({ config }: UseScreensOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['screens'],
    queryFn: () => getScreens(),
  });
};
