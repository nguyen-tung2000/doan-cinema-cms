import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { CustomersResponse } from '@/features/auth';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type CreateCustomerDTO = {
  email: string;
  phone_number: string;
  name: string;
  date_of_birth: string;
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
        phone_number: newCustomer.phone_number,
        point: 0,
        money_point: 0,
        profile: {
          address: {
            city: '',
            district: '',
            ward: '',
            street: '',
          },
          name: newCustomer.name,
          date_of_birth: newCustomer.date_of_birth,
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
