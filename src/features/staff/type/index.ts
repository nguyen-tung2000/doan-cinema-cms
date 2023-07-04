export interface StaffType {
  id: string;
  email: string;
  phone_number: string;
  permission_id: number;
  cinema: string;
  created_at: string;
  profile: {
    name: string;
    date_of_birth: string;
    male: boolean;
    avatar: string;
  };
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
