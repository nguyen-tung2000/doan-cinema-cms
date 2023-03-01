import { Customer } from '@/features/auth';

export const mapInitialCustomer = (customer: Customer) => {
  return {
    id: customer._id,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
    fullName: customer.profile.fullName,
    address: {
      city: customer.profile.address?.city || '',
      district: customer.profile.address?.district || '',
      ward: customer.profile.address?.ward || '',
      street: customer.profile.address?.street || '',
    },
    dateOfBirth: customer.profile.dateOfBirth,
    hobby: customer.profile.hobby || '',
    male: customer.profile.male || true,
    avatar: customer.profile.avatar || '',
  };
};

export const mapDataCustomer = (customer: Customer[] | undefined) => {
  const newCustomer =
    customer &&
    customer
      .filter((ctm) => ctm.email !== 'cientdefault@gmail.com') // Exclude client default
      .map((ctm) => ({
        _id: ctm._id,
        email: ctm.email,
        phoneNumber: ctm.phoneNumber,
        fullName: ctm.profile.fullName,
        dateOfBirth: ctm.profile.dateOfBirth,
        hobby: ctm.profile.hobby || '',
        male: ctm.profile.male || true,
        avatar: ctm.profile.avatar || '',
        address: {
          city: ctm.profile.address?.city || '',
          district: ctm.profile.address?.district || '',
          ward: ctm.profile.address?.ward || '',
          street: ctm.profile.address?.street || '',
        },
        customer: ctm,
      }));

  return newCustomer;
};
