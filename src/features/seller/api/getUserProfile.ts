import { useQuery } from 'react-query';

import { AuthResponse } from '@/features/seller';
import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface PhoneDTO {
  phoneNumber: string;
}

export const getUserProfile = ({ phoneNumber }: PhoneDTO): Promise<AuthResponse> => {
  return axios.get(`/auth/get-user-by-phone`, {
    params: {
      phoneNumber,
    },
  });
};

type UseUserProfileOptions = {
  config?: QueryConfig<typeof getUserProfile>;
  phoneNumber: string;
};

export const useUserProfileByPhone = ({ config, phoneNumber }: UseUserProfileOptions) => {
  return useQuery({
    ...config,
    queryKey: ['userProfileByPhone', phoneNumber],
    queryFn: () => getUserProfile({ phoneNumber }),
  });
};
