import { useMutation } from 'react-query';

import { StaffRespon } from '../type';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { Toast } from '@/utils/Toast';

export const deleteStaff = ({ staff_id }: { staff_id: number }) => {
  return axios.delete(`/staff/delete/${staff_id}`);
};

type UseStaffDelete = {
  config?: MutationConfig<typeof deleteStaff>;
};

export const useDeleteStaff = ({ config }: UseStaffDelete = {}) => {
  return useMutation({
    onMutate: async (deleteStaff) => {
      await queryClient.cancelQueries('staffs');

      const previousStaffs = queryClient.getQueryData<StaffRespon>('staffs');

      queryClient.setQueryData('staffs', {
        ...previousStaffs,
        values: {
          staffs: previousStaffs?.values.staffs.filter(
            (staff) => staff.id !== deleteStaff.staff_id,
          ),
        },
      });

      return { previousStaffs };
    },
    onError: (_, __, context: any) => {
      if (context?.previousStaffs) {
        queryClient.setQueryData('staffs', context.previousStaffs);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('staffs');
      Toast('Deleted Staff');
    },
    ...config,
    mutationFn: deleteStaff,
  });
};
