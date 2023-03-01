import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { CustomersResponse } from '@/features/auth';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type UpdateCustomerDTO = {
  data: {
    email: string;
    phoneNumber: string;
    fullName: string;
    address?: {
      city: string;
      district: string;
      ward: string;
      street: string;
    };
    dateOfBirth: string;
    hobby?: string;
    male?: boolean;
    avatar?: string;
  };
  customerId: string;
};

export const updateCustomer = ({ data, customerId }: UpdateCustomerDTO): Promise<any> => {
  return axios.put(`/auth/update/${customerId}`, data);
};

type UseUpdateCustomerOptions = {
  config?: MutationConfig<typeof updateCustomer>;
};

export const useUpdateCustomer = ({ config }: UseUpdateCustomerOptions = {}) => {
  const toast = createStandaloneToast();
  return useMutation({
    onMutate: async (updatingCustomer) => {
      await queryClient.cancelQueries(['customers', updatingCustomer.customerId]);

      const previousCustomers = queryClient.getQueryData<CustomersResponse>([
        'customers',
        updatingCustomer.customerId,
      ]);

      queryClient.setQueryData(['customers', updatingCustomer.customerId], {
        ...previousCustomers,
        values: {
          users: { ...updatingCustomer.data, _id: updatingCustomer.customerId },
        },
      });

      return { previousCustomers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousCustomers) {
        queryClient.setQueryData('customers', context.previousCustomers);
      }
    },
    onSuccess: (data) => {
      const { success, errors } = data;
      queryClient.invalidateQueries('customers');
      if (success) {
        toast({
          title: 'Cập nhật khách hàng thành công',
          status: 'success',
          isClosable: true,
          position: 'top-right',
        });
      } else {
        const titleError = Object.keys(errors)
          .map((key) => errors[key])
          .join(' ');
        toast({
          title: titleError,
          status: 'error',
          isClosable: true,
          position: 'top-right',
        });
      }
    },
    ...config,
    mutationFn: updateCustomer,
  });
};
