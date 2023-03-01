import { useMutation } from 'react-query';

import { StaffRespon } from '@/features/staff';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { Toast } from '@/utils/Toast';

export type UpdateStaffDTO = {
  data: {
    email: string;
    phoneNumber: string;
    fullName: string;
    male: boolean;
    avatar: string;
    cinemaId: string | undefined;
    dateOfBirth: string;
    permissionId: string | undefined;
  };
  staffId: string | undefined;
};

export const editStaff = ({ data, staffId }: UpdateStaffDTO): Promise<StaffRespon> => {
  return axios.put(`/staff/update/${staffId}`, data);
};

type UseUpdateStaffOptions = {
  config?: MutationConfig<typeof editStaff>;
};

export const useEditStaff = ({ config }: UseUpdateStaffOptions = {}) => {
  return useMutation({
    onMutate: async (updatingStaff) => {
      await queryClient.cancelQueries(['staffs', updatingStaff.staffId]);

      const previousStaff = queryClient.getQueryData<StaffRespon>([
        'staffs',
        updatingStaff.staffId,
      ]);

      queryClient.setQueryData(['staffs', updatingStaff.staffId], {
        ...previousStaff,
        staffs: { ...updatingStaff.data, _id: updatingStaff.staffId },
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
