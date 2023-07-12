export interface CinemaType {
  id: string;
  name: string;
  address: string;
  created_at?: string;
}

export interface CinemaRespone {
  success: boolean;
  message: string;
  values: CinemaType[];
  errors: CinemaType;
}

export interface City {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}

export interface District extends City {
  province_code: number;
  wards: Ward[];
}

export interface Ward extends City {
  district_code: number;
}
