import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { CustomersResponse } from '@/features/auth';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export const deleteCustomer = ({ customerId }: { customerId: string }) => {
  return axios.delete(`/auth/delete/${customerId}`);
};

type UseDeleteCustomertOptions = {
  config?: MutationConfig<typeof deleteCustomer>;
};

export const useDeleteCustomer = ({ config }: UseDeleteCustomertOptions = {}) => {
  const toast = createStandaloneToast();

  return useMutation({
    onMutate: async (deleteCustomer) => {
      await queryClient.cancelQueries('customers');

      const previousCustomers = queryClient.getQueryData<CustomersResponse>('customers');

      queryClient.setQueryData('customers', {
        ...previousCustomers,
        values: {
          users: previousCustomers?.values.users.filter(
            (customer: any) => customer._id !== deleteCustomer.customerId,
          ),
        },
      });

      return { previousCustomers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCustomers) {
        queryClient.setQueryData('customers', context.previousCustomers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('customers');
      toast({
        title: 'Xoá khách hàng thành công',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: deleteCustomer,
  });
};
