import { ChangePasswordRespon, ChangePasswordType } from '..';

import { axios } from '@/lib/axios';

export const ChangePassword = (data: ChangePasswordType): Promise<ChangePasswordRespon> => {
  return axios.put('/staff/change-password', data);
};
