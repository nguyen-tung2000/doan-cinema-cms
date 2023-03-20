import { useQuery } from "react-query";

import { TimSlotRespone } from "./../type";

import { axios } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";

export const getTimeSlots = (): Promise<TimSlotRespone> => {
  return axios.get(`/timeSlot/all`);
};

type UseTimeSlotsOptions = {
  config?: QueryConfig<typeof getTimeSlots>;
};

export const useTimeSlots = ({ config }: UseTimeSlotsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["timeSlots"],
    queryFn: () => getTimeSlots(),
  });
};
