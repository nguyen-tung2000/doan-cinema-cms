import create from 'zustand';

import { CUSTOMER_FORM } from '@/constants';

type useCustomerStoreType = {
  type: string;
  isOpen: boolean;
  initialValues: {
    id: string;
    email: string;
    phone_number: string;
    name: string;
    address?: {
      city: string;
      district: string;
      ward: string;
      street: string;
    };
    date_of_birth: string;
    hobby?: string;
    male: boolean;
    avatar?: string;
  };
  onOpen: (type: string, data?: any) => void;
  onClose: () => void;
};

const defaultCustomer = {
  id: '',
  email: '',
  phone_number: '',
  name: '',
  date_of_birth: '',
  male: true,
};

export const useCustomerStore = create<useCustomerStoreType>((set) => ({
  type: '',
  isOpen: false,
  initialValues: defaultCustomer,
  onOpen: (type: string, data?: any) =>
    set(() => ({
      isOpen: true,
      type,
      initialValues: type === CUSTOMER_FORM.EDIT ? data : defaultCustomer,
    })),
  onClose: () => set(() => ({ isOpen: false })),
}));
