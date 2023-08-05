import { CinemaType } from '@/features/cinema';

export interface UserAddress {
  city: string;
  district: string;
  ward: string;
  street: string;
}

export interface AuthUser {
  id: string;
  email: string;
  phone_number: string;
  name: string;
  date_of_birth: string;
  avatar: string;
  male: boolean;
  address: UserAddress;
  hobby: string;
  createdAt: string;
  permission_id: number;
  cinema_id: number;
  point?: number;
}

export type Customer = Omit<AuthUser, 'permissionid' | 'cinema'>;

export interface CustomersResponse {
  success: boolean;
  message: string;
  errors?: any;
  values: { users: Customer[] };
}

export interface UserResponse {
  token: string;
  staff: AuthUser;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  values: UserResponse;
  errors?: any;
  staff: AuthUser;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  values: AuthUser;
  errors?: any;
}

export interface Cities {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}

export interface District extends Cities {
  province_code: number;
  wards: Ward[];
}

export interface Ward extends Cities {
  district_code: number;
}
