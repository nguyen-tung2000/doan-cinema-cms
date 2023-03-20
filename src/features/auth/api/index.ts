import { useQuery } from "react-query";

import { AuthResponse, Cities, District, UserAddress } from "@/features/auth";
import { axios } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";

export const getUser = (): Promise<AuthResponse> => {
  return axios.get("/staff/me");
};

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<AuthResponse> => {
  return axios.post("/staff/login", data);
};

export type RegisterCredentialsDTO = {
  email: string;
  phoneNumber: string;
  fullName: string;
  address: UserAddress;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO,
): Promise<AuthResponse> => {
  return axios.post("/staff/register", data);
};

export const getWards = (district_code: string): Promise<District> => {
  return axios.get(`https://provinces.open-api.vn/api/d/${district_code}?depth=2`);
};

export const getDistrict = (code: string): Promise<Cities> => {
  return axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
};

export const getCites = (): Promise<Cities[]> => {
  return axios.get("https://provinces.open-api.vn/api/p/");
};

type UseCitiesOptions = {
  config?: QueryConfig<typeof getCites>;
};

export const useCities = ({ config = {} }: UseCitiesOptions = {}) => {
  return useQuery({
    queryKey: ["cites"],
    queryFn: () => getCites(),
    ...config,
  });
};
