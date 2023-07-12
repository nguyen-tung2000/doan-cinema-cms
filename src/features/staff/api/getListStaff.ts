import { useQuery } from 'react-query';

import { StaffRespon } from '../type';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getStaffs = (): Promise<StaffRespon> => {
  return axios.get(`/staff/all`);
};

type UseRoomsOptions = {
  config?: QueryConfig<typeof getStaffs>;
};

export const useStaffs = ({ config }: UseRoomsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['staffs'],
    queryFn: () => getStaffs(),
  });
};
