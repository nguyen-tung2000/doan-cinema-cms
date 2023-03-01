import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { CustomersResponse } from '@/features/auth';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type CreateCustomerDTO = {
  email: string;
  phoneNumber: string;
  fullName: string;
  dateOfBirth: string;
};

export const createCustomer = (data: CreateCustomerDTO): Promise<CustomersResponse> => {
  return axios.post('/auth/create-user-cms', data);
};

type UseCreateCustomerOptions = {
  config?: MutationConfig<typeof createCustomer>;
};

export const useCreateCustomer = ({ config }: UseCreateCustomerOptions = {}) => {
  const toast = createStandaloneToast();
  return useMutation({
    onMutate: async (newCustomer) => {
      await queryClient.cancelQueries('customers');

      const previousCustomers = queryClient.getQueryData<CustomersResponse>('cusomters');
      const newUser = {
        email: newCustomer.email,
        phoneNumber: newCustomer.phoneNumber,
        point: 0,
        moneyPoint: 0,
        profile: {
          address: {
            city: '',
            district: '',
            ward: '',
            street: '',
          },
          fullName: newCustomer.fullName,
          dateOfBirth: newCustomer.dateOfBirth,
          avatar: '',
          hobby: '',
          male: true,
        },
      };
      queryClient.setQueryData('customers', {
        ...previousCustomers,
        values: { users: [...(previousCustomers?.values.users || []), newUser] },
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
          title: 'Thêm khách hàng thành công',
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
    mutationFn: createCustomer,
  });
};
