import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation } from 'react-query';

import { ComboItem, SeatType, BuyTicketResponse } from '@/features/seller';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

export type BuyTicketDTO = {
  showTimeDetailId: string;
  userId?: string;
  data: SeatType[];
  payment: {
    type: string;
  };
  combos: ComboItem[];
};

export const buyTicket = (data: BuyTicketDTO): Promise<BuyTicketResponse> => {
  return axios.post('/ticker/add', data);
};

type UseBuyTicketOptions = {
  config?: MutationConfig<typeof buyTicket>;
};

export const useBuyTicket = ({ config }: UseBuyTicketOptions = {}) => {
  const toast = createStandaloneToast();

  return useMutation({
    onMutate: async (newTickets) => {
      await queryClient.cancelQueries('ticketsByShowtimes');

      const previousTickets = queryClient.getQueryData<BuyTicketResponse>('ticketsByShowtimes');

      queryClient.setQueryData('ticketsByShowtimes', {
        ...previousTickets,
        values: { tickets: [...(previousTickets?.tickets || []), newTickets] },
      });

      return { previousTickets };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTickets) {
        queryClient.setQueryData('ticketsByShowtimes', context.previousTickets);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries('ticketsByShowtimes');
        toast({
          title: 'Mua vé thành công!',
          status: 'success',
          isClosable: true,
          position: 'top-right',
        });
      } else {
        toast({
          title: 'Xảy ra lỗi!',
          status: 'error',
          isClosable: true,
          position: 'top-right',
        });
      }
    },
    ...config,
    mutationFn: buyTicket,
  });
};
