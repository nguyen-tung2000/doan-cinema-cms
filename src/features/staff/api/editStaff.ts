import { useMutation } from 'react-query';

import { StaffRespon } from '@/features/staff';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { Toast } from '@/utils/Toast';

export type UpdateStaffDTO = {
  data: {
    email: string;
    phone_number: string;
    name: string;
    male: boolean;
    avatar: string;
    cinema_id: number | undefined;
    date_of_birth: string;
    permission_id: number | undefined;
  };
  staff_id: number | string | undefined;
};

export const editStaff = ({ data }: UpdateStaffDTO): Promise<StaffRespon> => {
  return axios.put(`/staff/updateStaff`, data);
};

type UseUpdateStaffOptions = {
  config?: MutationConfig<typeof editStaff>;
};

export const useEditStaff = ({ config }: UseUpdateStaffOptions = {}) => {
  return useMutation({
    onMutate: async (updatingStaff) => {
      await queryClient.cancelQueries(['staffs', updatingStaff.staff_id]);

      const previousStaff = queryClient.getQueryData<StaffRespon>([
        'staffs',
        updatingStaff.staff_id,
      ]);

      queryClient.setQueryData(['staffs', updatingStaff.staff_id], {
        ...previousStaff,
        staffs: { ...updatingStaff.data, id: updatingStaff.staff_id },
      });

      return { previousStaff };
    },
    onError: (_, __, context: any) => {
      if (context?.previousStaff) {
        queryClient.setQueryData('staffs', context.previousStaff);
      }
    },
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries('auth-user');
        queryClient.invalidateQueries('staffs');
        Toast('Updated Staff');
      } else {
        queryClient.invalidateQueries('staffs');
      }
    },
    ...config,
    mutationFn: editStaff,
  });
};
