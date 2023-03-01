import { useQuery } from 'react-query';

import { PermissionRespon } from '../type';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getPermissions = (): Promise<PermissionRespon> => {
  return axios.get(`/permission/all`);
};

type UsePermissionsOptions = {
  config?: QueryConfig<typeof getPermissions>;
};

export const usePermissions = ({ config }: UsePermissionsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['permissions'],
    queryFn: () => getPermissions(),
  });
};
