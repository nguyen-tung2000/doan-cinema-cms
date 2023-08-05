export interface StaffType {
  id: number;
  email: string;
  phone_number: string;
  permission_id: number;
  cinema_id: number;
  name: string;
  date_of_birth: string;
  male: boolean;
  avatar: string;
}

export interface StaffRespon {
  success: boolean;
  message: string;
  values: {
    staffs: StaffType[];
  };
  errors: {
    phone_number: string;
    email: string;
    male: string;
    name: string;
  };
}

export interface CinemaType {
  id: string;
  name: string;
  payments: {
    type: string;
    user: string;
  }[];
  address: {
    city: string;
    district: string;
    ward: string;
    street: string;
    lat: string;
    lng: string;
  };
}

export interface CinemaRespon {
  success: boolean;
  message: string;
  values: {
    cinemas: CinemaType[];
  };
}
