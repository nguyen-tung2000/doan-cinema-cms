import { useQuery } from 'react-query';

import { TicketResponse } from '..';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

interface TicketsDTO {
  showtimesId: string;
}

export const getTicketsByShowTimes = ({ showtimesId }: TicketsDTO): Promise<TicketResponse> => {
  return axios.get(`/ticker/get-list-ticker/${showtimesId}`);
};

type UseTicketsByShowTimesOptions = {
  config?: QueryConfig<typeof getTicketsByShowTimes>;
  showtimesId: string;
};

export const useTicketsByShowTimes = ({ config, showtimesId }: UseTicketsByShowTimesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['ticketsByShowtimes', showtimesId],
    queryFn: () => getTicketsByShowTimes({ showtimesId }),
  });
};
