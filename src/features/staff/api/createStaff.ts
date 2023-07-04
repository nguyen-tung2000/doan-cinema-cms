import { useMutation } from 'react-query';

import { StaffRespon } from '../type';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { Toast } from '@/utils/Toast';

export type CreateStaffDTO = {
  email: string;
  phone_number: string;
  name: string;
  male: boolean;
  avatar: string;
  date_of_birth: string;
  permission_id: number;
  cinema_id: string;
};

export const createStaff = (data: CreateStaffDTO): Promise<StaffRespon> => {
  return axios.post('/staff/register', data);
};

type UseCreateStaffOptions = {
  config?: MutationConfig<typeof createStaff>;
};

export const useCreateStaff = ({ config }: UseCreateStaffOptions = {}) => {
  return useMutation({
    onMutate: async (newStaff) => {
      await queryClient.cancelQueries('staffs');

      const previousStaffs = queryClient.getQueryData<StaffRespon>('staffs');

      queryClient.setQueryData('staffs', {
        ...previousStaffs,
        values: { staffs: [...(previousStaffs?.values.staffs || []), newStaff] },
      });

      return { previousStaffs };
    },
    onError: (context: any) => {
      if (context?.previousStaffs) {
        queryClient.setQueryData('staffs', context.previousStaffs);
      }
    },
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries('staffs');
        Toast('Created Staff');
      } else {
        queryClient.invalidateQueries('staffs');
      }
    },
    ...config,
    mutationFn: createStaff,
  });
};
