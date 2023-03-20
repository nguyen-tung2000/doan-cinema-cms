import { useQuery } from "react-query";

import { Cities, District } from "@/features/auth";
import { axios } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
export const getCites = (): Promise<Cities[]> => {
  return axios.get("https://provinces.open-api.vn/api/p/");
};

type UseCitiesOptions = {
  config?: QueryConfig<typeof getCites>;
};

export const useCities = ({ config = {} }: UseCitiesOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ["cities"],
    queryFn: () => getCites(),
  });
};

export const getWards = (district_code: string): Promise<District> => {
  return axios.get(`https://provinces.open-api.vn/api/d/${district_code}?depth=2`);
};

export const getDistrict = (code: string): Promise<Cities> => {
  return axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
};
