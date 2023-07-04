import { Customer } from '@/features/auth';

export const mapInitialCustomer = (customer: Customer) => {
  return {
    id: customer.id,
    email: customer.email,
    phone_number: customer.phone_number,
    name: customer.name,
    address: {
      city: customer.address?.city || '',
      district: customer.address?.district || '',
      ward: customer.address?.ward || '',
      street: customer.address?.street || '',
    },
    date_of_birth: customer.date_of_birth,
    hobby: customer.hobby || '',
    male: customer.male || true,
    avatar: customer.avatar || '',
  };
};

export const mapDataCustomer = (customer: Customer[] | undefined) => {
  const newCustomer =
    customer &&
    customer
      .filter((ctm) => ctm.email !== 'cientdefault@gmail.com') // Exclude client default
      .map((ctm) => ({
        id: ctm.id,
        email: ctm.email,
        phone_number: ctm.phone_number,
        name: ctm.name,
        date_of_birth: ctm.date_of_birth,
        hobby: ctm.hobby || '',
        male: ctm.male || true,
        avatar: ctm.avatar || '',
        address: {
          city: ctm.address?.city || '',
          district: ctm.address?.district || '',
          ward: ctm.address?.ward || '',
          street: ctm.address?.street || '',
        },
        customer: ctm,
      }));

  return newCustomer;
};
