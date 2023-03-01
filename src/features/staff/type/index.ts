export interface StaffType {
  _id: string;
  email: string;
  phoneNumber: string;
  permission: {
    _id: string;
    name: string;
    type: string;
  };
  cinema: string;
  createdAt: string;
  profile: {
    fullName: string;
    dateOfBirth: string;
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
    phoneNumber: string;
    email: string;
    male: string;
    name: string;
  };
}

export interface CinemaType {
  _id: string;
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

export interface PermissionType {
  _id: string;
  name: string;
  type: string;
}

export interface PermissionRespon {
  success: boolean;
  message: string;
  values: {
    permissions: PermissionType[];
  };
}
