import create from 'zustand';

import { CUSTOMER_FORM } from '@/constants';

type useCustomerStoreType = {
  type: string;
  isOpen: boolean;
  initialValues: {
    _id: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    address?: {
      city: string;
      district: string;
      ward: string;
      street: string;
    };
    dateOfBirth: string;
    hobby?: string;
    male: boolean;
    avatar?: string;
  };
  onOpen: (type: string, data?: any) => void;
  onClose: () => void;
};

const defaultCustomer = {
  _id: '',
  email: '',
  phoneNumber: '',
  fullName: '',
  dateOfBirth: '',
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
