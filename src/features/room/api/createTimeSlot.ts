import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { TimSlotRespone } from '../type';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type CreateTimeSlotDTO = {
  time: string;
};

export const createTimeSlot = (data: CreateTimeSlotDTO): Promise<TimSlotRespone> => {
  return axios.post('/timeslot/addTimeslot', data);
};

type UseCreateTimeSlotOptions = {
  config?: MutationConfig<typeof createTimeSlot>;
};

export const useCreateTimeSlot = ({ config }: UseCreateTimeSlotOptions = {}) => {
  const toast = createStandaloneToast();
  return useMutation({
    onMutate: async (newTimeSlot) => {
      await queryClient.cancelQueries('timeSlots');

      const previousTimeSlots = queryClient.getQueryData<TimSlotRespone>('timeSlots');

      queryClient.setQueryData('timeSlots', {
        ...previousTimeSlots,
        values: { timeSlots: [...(previousTimeSlots?.values.timeSlots || []), newTimeSlot] },
      });

      return { previousTimeSlots };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTimeSlots) {
        queryClient.setQueryData('timeSlots', context.previousTimeSlots);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('timeSlots');
      toast({
        title: 'Created TimeSlot',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    },
    ...config,
    mutationFn: createTimeSlot,
  });
};
