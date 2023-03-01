export interface CinemaType {
  _id: string;
  name: string;
  address: {
    city: string;
    district: string;
    ward: string;
    street: string;
    lat?: string;
    lng?: string;
  };
  createdAt?: string;
}

export interface CinemaRespone {
  success: boolean;
  message: string;
  values: {
    cinemas: CinemaType[];
  };
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
