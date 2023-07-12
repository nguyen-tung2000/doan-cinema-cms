import { useQuery } from 'react-query';

import { AuthResponse, Cities, District, RegisterResponse, UserAddress } from '@/features/auth';
import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

export const getUser = (): Promise<RegisterResponse> => {
  return axios.get('/staff/getMe');
};

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<AuthResponse> => {
  return axios.post('/staff/login', data);
};

export type RegisterCredentialsDTO = {
  email: string;
  phone_number: string;
  name: string;
  address: UserAddress;
  date_of_birth: string;
  password: string;
  confirm_password: string;
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO,
): Promise<AuthResponse> => {
  return axios.post('/staff/register', data);
};

export const getWards = (district_code: string): Promise<District> => {
  return axios.get(`https://provinces.open-api.vn/api/d/${district_code}?depth=2`);
};

export const getDistrict = (code: string): Promise<Cities> => {
  return axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
};

export const getCites = (): Promise<Cities[]> => {
  return axios.get('https://provinces.open-api.vn/api/p/');
};

type UseCitiesOptions = {
  config?: QueryConfig<typeof getCites>;
};

export const useCities = ({ config = {} }: UseCitiesOptions = {}) => {
  return useQuery({
    queryKey: ['cites'],
    queryFn: () => getCites(),
    ...config,
  });
};
