import { useQuery } from "react-query";

import { CustomersResponse } from "@/features/auth";
import { axios } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";

export const getCustomers = (): Promise<CustomersResponse> => {
  return axios.get(`/auth/all`);
};

type UseCustomersOptions = {
  config?: QueryConfig<typeof getCustomers>;
};

export const useCustomers = ({ config }: UseCustomersOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
  });
};
