import { CinemaType } from '@/features/cinema';

export interface UserAddress {
  city: string;
  district: string;
  ward: string;
  street: string;
}

export interface UserProfile {
  fullName: string;
  dateOfBirth: string;
  avatar: string;
  male: boolean;
  address: UserAddress;
  hobby: string;
}

interface UserPermission {
  _id?: string;
  name: string;
  type: string;
}

export interface AuthUser {
  _id: string;
  email: string;
  phoneNumber: string;
  profile: UserProfile;
  createdAt: string;
  permission: UserPermission;
  cinema: CinemaType;
  point?: number;
}

export type Customer = Omit<AuthUser, 'permission' | 'cinema'>;

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
